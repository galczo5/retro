import {Directive, ElementRef, Inject, Input, NgZone, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {fromEvent, Observable, Subject} from 'rxjs';
import {CardDragService} from './card-drag.service';
import {filter, takeUntil} from 'rxjs/operators';
import {EditorRoleService} from '../app/editor-role.service';
import {DOCUMENT} from '@angular/common';

@Directive({
  selector: '[appDrag]'
})
export class DragDirective implements OnInit, OnDestroy {

  @Input()
  dragData: string;

  private readonly onDestroy$: Subject<void> = new Subject<void>();
  private clone: HTMLElement;

  constructor(private readonly elementRef: ElementRef,
              private readonly renderer: Renderer2,
              private readonly cardDragService: CardDragService,
              private readonly editorRoleService: EditorRoleService,
              private readonly ngZone: NgZone,
              @Inject(DOCUMENT) private readonly document: Document) {
  }

  ngOnInit(): void {
    if (!this.dragData || !this.editorRoleService.canEdit()) {
      return;
    }

    const dragEnd$ = this.cardDragService.onDrag()
      .pipe(
        filter(state => !state),
        takeUntil(this.onDestroy$)
      );

    this.onMouseDown(dragEnd$);
    this.onDragEnd(dragEnd$);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private createClone(): void {
    const nativeElement = this.elementRef.nativeElement as HTMLElement;
    this.clone = nativeElement.cloneNode(true) as HTMLElement;
    this.clone.style.width = nativeElement.getBoundingClientRect().width + 'px';
    this.clone.style.willChange = 'transform';
    this.clone.style.top = '0px';
    this.clone.style.left = '0px';
    this.clone.style.position = 'absolute';
    this.clone.style.visibility = 'hidden';
    this.clone.style.opacity = '0.8';

    this.document.body.appendChild(this.clone);
  }

  private onDragEnd(dragEnd$: Observable<boolean>): void {
    dragEnd$
      .subscribe(() => {

        if (this.clone) {
          this.clone.remove();
          this.clone = null;
        }

        this.renderer.setStyle(this.elementRef.nativeElement, 'user-select', 'auto');
      });
  }

  private onMouseDown(dragEnd$: Observable<boolean>): void {
    fromEvent(this.elementRef.nativeElement, 'mousedown')
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.renderer.setStyle(this.elementRef.nativeElement, 'user-select', 'none');

        this.createClone();
        this.onMouseUp(dragEnd$);
        this.onMouseMove(dragEnd$);

        this.cardDragService.setCardHash(this.dragData);
        this.cardDragService.setDrag(true);
      });
  }

  private onMouseMove(dragEnd$: Observable<boolean>): void {
    this.ngZone.runOutsideAngular(() => {
      fromEvent(this.document, 'mousemove')
        .pipe(
          takeUntil(dragEnd$),
          takeUntil(this.onDestroy$)
        )
        .subscribe((event: MouseEvent) => {
          this.clone.style.transform = `translateY(${event.y}px) translateX(${event.x}px)`;
          this.clone.style.visibility = 'visible';
        });
    });
  }

  private onMouseUp(dragEnd$: Observable<boolean>): void {
    fromEvent(this.document, 'mouseup')
      .pipe(
        takeUntil(dragEnd$),
        takeUntil(this.onDestroy$)
      )
      .subscribe(() => {
        this.cardDragService.setDrag(false);
      });
  }

}
