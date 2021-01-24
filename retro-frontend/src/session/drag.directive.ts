import { Directive, ElementRef, Input, NgZone, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { CardDragService } from './card-drag.service';
import { filter, takeUntil } from 'rxjs/operators';
import { EditorRoleService } from '../app/editor-role.service';

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
              private readonly ngZone: NgZone) {

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

    fromEvent(this.elementRef.nativeElement, 'mousedown')
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.renderer.setStyle(this.elementRef.nativeElement, 'user-select', 'none');

        const nativeElement = this.elementRef.nativeElement as HTMLElement;
        this.clone = nativeElement.cloneNode(true) as HTMLElement;
        this.clone.style.width = nativeElement.getBoundingClientRect().width + 'px';
        this.clone.style.willChange = 'transform';
        this.clone.style.top = '0px';
        this.clone.style.left = '0px';
        this.clone.style.position = 'absolute';
        this.clone.style.visibility = 'hidden';

        document.body.appendChild(this.clone);

        fromEvent(document, 'mouseup')
          .pipe(
            takeUntil(dragEnd$),
            takeUntil(this.onDestroy$)
          )
          .subscribe(() => {
            this.cardDragService.setDrag(false);
          })

        this.ngZone.runOutsideAngular(() => {
          fromEvent(document, 'mousemove')
            .pipe(
              takeUntil(dragEnd$),
              takeUntil(this.onDestroy$)
            )
            .subscribe((event: MouseEvent) => {
              this.clone.style.transform = `translateY(${event.y}px) translateX(${event.x}px)`;
              this.clone.style.visibility = 'visible';
            })
        })

        this.cardDragService.setCardHash(this.dragData);
        this.cardDragService.setDrag(true);
      });

    dragEnd$
      .subscribe(() => {
        this.clone && this.clone.remove();
        this.clone = null;

        this.renderer.setStyle(this.elementRef.nativeElement, 'user-select', 'auto');
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
