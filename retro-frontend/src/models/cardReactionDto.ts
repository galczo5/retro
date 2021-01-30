import {Reaction} from '../../../retro-backend/src/model/cardReaction';

export interface CardReactionDto {
  readonly sessionHash: string;
  readonly cardHash: string;
  readonly reaction: Reaction;
  readonly creator: string;
}
