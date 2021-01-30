import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CardReactionDocument = CardReaction & Document;

export type Reaction = 'LOVED' | 'LIKED' | 'DISLIKED';

@Schema()
export class CardReaction {

  @Prop()
  readonly sessionHash: string;

  @Prop()
  readonly cardHash: string;

  @Prop()
  readonly reaction: Reaction;

  @Prop()
  readonly creator: string;


  constructor(sessionHash: string, cardHash: string, reaction: Reaction, creator: string) {
    this.sessionHash = sessionHash;
    this.cardHash = cardHash;
    this.reaction = reaction;
    this.creator = creator;
  }
}

export const CardReactionSchema = SchemaFactory.createForClass(CardReaction);
