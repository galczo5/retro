import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardsService } from '../cards.service';
import { Card } from '../../models/card';
import { Location } from '@angular/common';

@Component({
  selector: 'app-merge-cards',
  templateUrl: './merge-cards.component.html',
  styleUrls: ['./merge-cards.component.css']
})
export class MergeCardsComponent implements OnInit {

  left: Card;
  right: Card;

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly cardsService: CardsService,
              private readonly location: Location) { }

  ngOnInit(): void {
    const leftId = this.activatedRoute.snapshot.paramMap.get('id1');
    const rightId = this.activatedRoute.snapshot.paramMap.get('id2');

    this.cardsService.fetch();
    this.cardsService.getCards()
      .subscribe(cards => {
        this.left = cards.find(c => c.hash === leftId);
        this.right = cards.find(c => c.hash === rightId);
      });
  }

  prepareText(string: string): string {
    const prefix = ':thumbsup: `MERGED` \n\n';
    return prefix + string.replace(prefix, '');
  }

  merge(text: string): void {
    this.cardsService.merge(this.left.hash, this.right.hash, text);
    this.location.back();
  }

}
