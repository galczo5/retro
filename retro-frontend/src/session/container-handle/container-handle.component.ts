import {Component, ElementRef, EventEmitter, Inject, NgZone, OnDestroy, OnInit, Output, Renderer2} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {fromEvent, Subject} from 'rxjs';
import {CardContainerWidthService} from '../card-container-width.service';
import {take, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-container-handle',
  templateUrl: './container-handle.component.html',
  styleUrls: ['./container-handle.component.css']
})
export class ContainerHandleComponent implements OnInit, OnDestroy {

  @Output()
  widthDelta: EventEmitter<number> = new EventEmitter<number>();

  duringDrag = false;

  private readonly onDestroy$: Subject<void> = new Subject<void>();

  constructor(@Inject(DOCUMENT) private readonly document: Document,
              private readonly elementRef: ElementRef,
              private readonly cardContainerWidthService: CardContainerWidthService,
              private readonly renderer: Renderer2,
              private readonly ngZone: NgZone) {

  }

  ngOnInit(): void {

    fromEvent(this.elementRef.nativeElement, 'mousedown')
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((event: MouseEvent) => {
        const mouseUp$: Subject<void> = new Subject<void>();
        const startX = event.x;
        this.duringDrag = true;
        this.renderer.setStyle(this.elementRef.nativeElement, 'position', 'relative');

        this.ngZone.runOutsideAngular(() => {
          fromEvent(this.document, 'mousemove')
            .pipe(
              takeUntil(mouseUp$),
              takeUntil(this.onDestroy$)
            )
            .subscribe((mouseUpEvent: MouseEvent) => {
              const endX = mouseUpEvent.x;
              this.widthDelta.emit(endX - startX);
            });
        });

        fromEvent(this.document, 'mouseup')
          .pipe(
            takeUntil(mouseUp$),
            takeUntil(this.onDestroy$)
          )
          .subscribe((mouseUpEvent: MouseEvent) => {

            const endX = mouseUpEvent.x;
            this.cardContainerWidthService.get()
              .pipe(
                take(1),
                takeUntil(this.onDestroy$)
              )
              .subscribe(width => {
                this.cardContainerWidthService.set(width + (endX - startX));
              });

            this.duringDrag = false;
            this.renderer.removeStyle(this.elementRef.nativeElement, 'position');
            this.renderer.removeStyle(this.elementRef.nativeElement, 'left');

            mouseUp$.next();
            mouseUp$.complete();
          });

      });

  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
