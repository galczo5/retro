import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Reaction, ReactionWithCreator} from '../../models/reaction';
import {SessionHttpService} from '../../app/session-http.service';
import {CardReactionsService} from '../card-reactions.service';
import {Subject, timer} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {UserIdService} from "../../app/user-id.service";

@Component({
  selector: 'app-card-reactions',
  templateUrl: './card-reactions.component.html',
  host: {
    '[class.flex]': 'true',
    '[class.justify-end]': 'true'
  }
})
export class CardReactionsComponent implements OnInit, OnDestroy {

  @Input()
  reactions: Array<ReactionWithCreator> = [];

  @Input()
  cardHash: string;

  clicked: Reaction = null;

  private readonly onDestroy$: Subject<void> = new Subject<void>();

  constructor(private readonly httpService: SessionHttpService,
              private readonly cardReactionsService: CardReactionsService,
              private readonly idService: UserIdService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  toggle(event: MouseEvent, reaction: Reaction): void {
    this.stopPropagation(event);
    this.cardReactionsService.toggleReaction(this.cardHash, reaction);

    this.clicked = reaction;
    timer(2000)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.clicked = null;
      });
  }

  stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }

  getCount(reaction: Reaction): number {
    if (!this.reactions) {
      return 0;
    }

    return this.reactions.filter(r => r.reaction === reaction).length;
  }

  isActive(reaction: Reaction): boolean {
    if (!this.reactions) {
      return false;
    }

    return this.reactions
      .filter(r => r.reaction === reaction)
      .some(r => {
        return r.creator === this.idService.getUserId();
      });
  }

}
