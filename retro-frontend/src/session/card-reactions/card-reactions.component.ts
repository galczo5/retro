import {Component, Input, OnInit} from '@angular/core';
import {Reaction} from '../../models/reaction';
import {SessionHttpService} from '../../app/session-http.service';
import {CardReactionsService} from '../card-reactions.service';

@Component({
  selector: 'app-card-reactions',
  templateUrl: './card-reactions.component.html',
  styleUrls: ['./card-reactions.component.css'],
  host: {
    '[class.flex]': 'true',
    '[class.justify-end]': 'true'
  }
})
export class CardReactionsComponent implements OnInit {

  @Input()
  reactions: Array<Reaction> = [];

  @Input()
  cardHash: string;

  constructor(private readonly httpService: SessionHttpService,
              private readonly cardReactionsService: CardReactionsService) { }

  ngOnInit(): void {
  }

  toggle(event: MouseEvent, reaction: Reaction): void {
    event.stopPropagation();
    this.cardReactionsService.toggleReaction(this.cardHash, reaction);
  }

  liked(): number {
    if (!this.reactions) {
      return 0;
    }

    return this.reactions.filter(r => r === 'LIKED').length;
  }

  loved(): number {
    if (!this.reactions) {
      return 0;
    }

    return this.reactions.filter(r => r === 'LOVED').length;
  }

  disliked(): number {
    if (!this.reactions) {
      return 0;
    }

    return this.reactions.filter(r => r === 'DISLIKED').length;
  }

}
