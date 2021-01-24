import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CardDocument = Card & Document;

@Schema()
export class Card {

  @Prop()
  readonly hash: string;

  @Prop()
  readonly containerHash: string;

  @Prop()
  readonly sessionHash: string;

  @Prop()
  readonly text: string;

  @Prop()
  readonly creator: string;

  constructor(hash: string, containerHash: string, sessionHash: string, text: string, creator: string) {
    this.hash = hash;
    this.containerHash = containerHash;
    this.sessionHash = sessionHash;
    this.text = text;
    this.creator = creator;
  }
}

export const CardSchema = SchemaFactory.createForClass(Card);
