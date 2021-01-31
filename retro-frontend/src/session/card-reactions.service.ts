import { Injectable } from '@angular/core';
import {Observable, ReplaySubject} from "rxjs";
import {CardReaction} from "../models/cardReaction";
import {SessionHttpService} from "../app/session-http.service";
import {SessionHashService} from "./session-hash.service";
import {map, switchMap, take} from "rxjs/operators";
import {Reaction, ReactionWithCreator} from "../models/reaction";

@Injectable({
  providedIn: 'root'
})
export class CardReactionsService {

  private reactions$: ReplaySubject<Array<CardReaction>> = new ReplaySubject<Array<CardReaction>>(1);

  constructor(private readonly httpService: SessionHttpService,
              private readonly sessionHashService: SessionHashService) { }

  fetch(): void {
    this.sessionHashService.getHash()
      .pipe(
        take(1),
        switchMap(hash => this.httpService.getCardReactions(hash))
      )
      .subscribe(cardReactions => {
        const reactions = cardReactions.map(r => new CardReaction(r.sessionHash, r.cardHash, r.reaction, r.creator));
        this.reactions$.next(reactions);
      });
  }

  getReactions(): Observable<Map<string, Array<ReactionWithCreator>>> {
    return this.reactions$
      .pipe(
        map(reactions => {
          const result = new Map<string, Array<ReactionWithCreator>>();

          for (const reaction of reactions) {
            const value = result.get(reaction.cardHash) || [];
            const newReaction: ReactionWithCreator = {
              creator: reaction.creator,
              reaction: reaction.reaction
            };

            result.set(reaction.cardHash, [...value, newReaction]);
          }

          return result;
        })
      );
  }

  toggleReaction(cardHash: string, reaction: Reaction): void {
    this.sessionHashService.getHash()
      .pipe(
        take(1),
        switchMap(hash => this.httpService.toggleCardReaction(hash, cardHash, reaction))
      )
      .subscribe(() => {
        this.fetch();
      });
  }
}
