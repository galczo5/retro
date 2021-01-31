import {Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ContainersService} from '../containers.service';
import {SessionHashService} from '../session-hash.service';
import {Container} from '../../models/container';
import {fromEvent, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {CardsService} from '../cards.service';
import {Card} from '../../models/card';
import {CardContainerWidthDeltaService} from '../card-container-width-delta.service';
import {DOCUMENT} from '@angular/common';
import {CardReactionsService} from '../card-reactions.service';
import {Reaction, ReactionWithCreator} from '../../models/reaction';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit, OnDestroy {

  @ViewChild('scrollContainer', { read: ElementRef })
  scrollContainer: ElementRef;

  containers: Array<Container>;

  hash: string;

  reactionsMap: Map<string, Array<ReactionWithCreator>> = new Map<string, Array<ReactionWithCreator>>();

  private cards: Map<string, Array<Card>> = new Map<string, Array<Card>>();
  private readonly onDestroy$: Subject<void> = new Subject<void>();

  constructor(private readonly route: ActivatedRoute,
              private readonly containersService: ContainersService,
              private readonly cardsService: CardsService,
              private readonly sessionHashService: SessionHashService,
              private readonly cardContainerWidthDeltaService: CardContainerWidthDeltaService,
              private readonly cardReactionsService: CardReactionsService,
              @Inject(DOCUMENT) private readonly document: Document,
              private readonly router: Router) {
  }

  ngOnInit(): void {
    this.containersService.fetch();
    this.cardsService.fetch();
    this.cardReactionsService.fetch();

    this.cardReactionsService.getReactions()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(reactionsMap => {
        this.reactionsMap = reactionsMap;
      });

    this.sessionHashService.getHash()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(hash => {
        this.hash = hash;
      });

    this.containersService.getContainers()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(containers => {
        this.containers = containers;
      });

    fromEvent(this.document, 'keydown')
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((event: KeyboardEvent) => {
        if (event.key === 'c') {
          this.router.navigate(['new-card'], { relativeTo: this.route });
          event.preventDefault();
          event.stopPropagation();
        }
      });

    this.cardsService.getCards()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(cards => {
        this.cards = new Map<string, Array<Card>>();

        for (const card of cards) {
          const key = card.containerHash;
          if (this.cards.has(key)) {
            const value = this.cards.get(key);
            this.cards.set(key, [...value, card]);
          } else {
            this.cards.set(key, [card]);
          }
        }

      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  onWidthChange(hash: string, delta: number): void {
    this.cardContainerWidthDeltaService.set(hash, delta);
  }

  getCards(containerHash: string): Array<Card> {
    return this.cards.get(containerHash) || [];
  }

  cardDropped(containerHash: string, cardHash: string): void {
    this.cardsService.move(this.hash, containerHash, cardHash);
  }

}
