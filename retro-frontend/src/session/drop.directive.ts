import { Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { CardDragService } from './card-drag.service';
import { fromEvent, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appDrop]'
})
export class DropDirective implements OnInit, OnDestroy {

  @Output()
  onDrop: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  onDragEnter: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  onDragLeave: EventEmitter<void> = new EventEmitter<void>();

  private zoneActive: boolean = false;

  private readonly onDestroy$: Subject<void> = new Subject<void>();

  constructor(private readonly elementRef: ElementRef,
              private readonly renderer: Renderer2,
              private readonly cardDragService: CardDragService) {

  }

  ngOnInit(): void {

    const dragEnd$ = this.cardDragService.onDrag()
      .pipe(filter(state => !state));

    this.cardDragService.onDrag()
      .pipe(
        filter(state => state),
        takeUntil(this.onDestroy$)
      )
      .subscribe(() => {
        fromEvent(this.elementRef.nativeElement, 'mouseenter')
          .pipe(
            takeUntil(dragEnd$),
            takeUntil(this.onDestroy$)
          )
          .subscribe((event: Event) => {
            event.stopPropagation();
            this.zoneActive = true;
            this.cardDragService.setDragEnter(this);
          });

        fromEvent(this.elementRef.nativeElement, 'mouseleave')
          .pipe(
            takeUntil(dragEnd$),
            takeUntil(this.onDestroy$)
          )
          .subscribe((event: Event) => {
            event.stopPropagation();
            this.zoneActive = false;
            this.onDragLeave.emit();
          });

        fromEvent(this.elementRef.nativeElement, 'mouseover')
          .pipe(
            takeUntil(dragEnd$),
            takeUntil(this.onDestroy$)
          )
          .subscribe((event: Event) => {
            event.stopPropagation();
            this.zoneActive = true;
            this.cardDragService.setDragEnter(this);
          });

        fromEvent(this.elementRef.nativeElement, 'mouseup')
          .pipe(
            takeUntil(this.onDestroy$),
            takeUntil(dragEnd$)
          )
          .subscribe(() => {
            this.cardDragService.setDrag(false)
            this.onDragLeave.emit();
            this.onDrop.emit(this.cardDragService.getCardHash());
          });
      })

    this.cardDragService.onDragEnter()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((ref) => {
        if (this.zoneActive && ref === this) {
          this.onDragEnter.emit();
        } else if (this.zoneActive) {
          this.onDragLeave.emit();
        }
      });

  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
