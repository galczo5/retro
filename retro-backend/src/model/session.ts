import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Container } from './container';

export type SessionDocument = Session & Document;

@Schema()
export class Session {

  @Prop()
  readonly hash: string;

  @Prop()
  readonly secret: string;

  @Prop()
  readonly cardsVisible: boolean;

  constructor(hash: string, editorSecret: string, cardsVisible: boolean) {
    this.hash = hash;
    this.secret = editorSecret;
    this.cardsVisible = cardsVisible;
  }

}

export const SessionSchema = SchemaFactory.createForClass(Session);
