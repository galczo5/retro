import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContainersService } from '../containers.service';
import { SessionHashService } from '../session-hash.service';
import { Container } from '../../models/container';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CardsService } from '../cards.service';
import { Card } from '../../models/card';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit, OnDestroy {

  containers: Array<Container>;

  hash: string;

  private cards: Map<string, Array<Card>> = new Map<string, Array<Card>>()

  private readonly onDestroy$: Subject<void> = new Subject<void>();

  constructor(private readonly route: ActivatedRoute,
              private readonly containersService: ContainersService,
              private readonly cardsService: CardsService,
              private readonly sessionHashService: SessionHashService) { }

  ngOnInit(): void {
    this.containersService.fetch();
    this.cardsService.fetch();

    this.sessionHashService.getHash()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(hash => {
        this.hash = hash;
      });

    this.containersService.getContainers()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(containers => {
        this.containers = containers;
      })

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

  getCards(containerHash: string): Array<Card> {
    return this.cards.get(containerHash) || [];
  }

  cardDropped(containerHash: string, cardHash: string): void {
    this.cardsService.move(this.hash, containerHash, cardHash);
  }

}
