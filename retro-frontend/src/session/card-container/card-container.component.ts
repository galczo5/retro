import {ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, Renderer2} from '@angular/core';
import {SessionHttpService} from '../../app/session-http.service';
import {ContainersService} from '../containers.service';
import {Card} from '../../models/card';
import {EditorRoleService} from '../../app/editor-role.service';
import {CardContainerWidthService} from '../card-container-width.service';
import {filter, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {CardContainerWidthDeltaService} from '../card-container-width-delta.service';
import {DOCUMENT} from '@angular/common';
import {Reaction} from "../../models/reaction";

const DEFAULT_RESPONSIVE_WIDTH = 300;

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html'
})
export class CardContainerComponent implements OnInit, OnDestroy {

  @Input()
  sessionHash: string;

  @Input()
  hash: string;

  @Input()
  header: string;

  @Input()
  cards: Array<Card> = [];

  @Input()
  reactions: Map<string, Array<Reaction>> = new Map<string, Array<Reaction>>();

  @Output()
  cardDropped: EventEmitter<string> = new EventEmitter<string>();

  dropActive = false;

  containerWidth = 600;
  containerWidthDelta = 0;

  canEdit = false;

  private readonly onDestroy$: Subject<void> = new Subject<void>();

  constructor(private readonly httpService: SessionHttpService,
              private readonly containersService: ContainersService,
              private readonly editorRoleService: EditorRoleService,
              private readonly cardContainerWidthService: CardContainerWidthService,
              private readonly cardContainerWidthDeltaService: CardContainerWidthDeltaService,
              private readonly changeDetectorRef: ChangeDetectorRef,
              @Inject(DOCUMENT) private readonly document: Document) {
  }

  ngOnInit(): void {
    if (!this.allowWidthChange()) {
      this.containerWidth = DEFAULT_RESPONSIVE_WIDTH;
    }

    this.canEdit = this.editorRoleService.canEdit();

    this.cardContainerWidthService.get()
      .pipe(
        filter(() => this.allowWidthChange()),
        takeUntil(this.onDestroy$)
      )
      .subscribe(width => {
        this.containerWidth = width;
        this.containerWidthDelta = 0;
      });

    this.cardContainerWidthDeltaService.get()
      .pipe(
        filter(() => this.allowWidthChange()),
        filter(delta => delta.containerHash === this.hash),
        takeUntil(this.onDestroy$)
      )
      .subscribe(delta => {
        this.containerWidthDelta = delta.delta;
        this.changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  allowWidthChange(): boolean {
    return this.document.body.clientWidth > 1000;
  }

  deleteContainer(): void {
    this.httpService.deleteContainer(this.sessionHash, this.hash)
      .subscribe(() => {
        this.containersService.fetch();
      });
  }

  getCards(mod: number): Array<Card> {
    return this.cards.filter((value, index) => index % 2 === mod);
  }

  getCounter(): string {
    return this.cards.length + (this.cards.length === 1 ? ' thought' : ' thoughts');
  }

  dropped(event: string): void {
    this.cardDropped.emit(event);
  }

  setDropActive(value: boolean): void {
    this.dropActive = value;
  }
}
