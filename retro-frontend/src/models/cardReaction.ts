import {Reaction} from '../../../retro-backend/src/model/cardReaction';

export class CardReaction {
  readonly sessionHash: string;
  readonly cardHash: string;
  readonly reaction: Reaction;
  readonly creator: string;

  constructor(sessionHash: string, cardHash: string, reaction: Reaction, creator: string) {
    this.sessionHash = sessionHash;
    this.cardHash = cardHash;
    this.reaction = reaction;
    this.creator = creator;
  }
}
