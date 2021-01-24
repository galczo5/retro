import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TokenDocument = Token & Document;

@Schema()
export class Token {

  @Prop()
  readonly sessionHash: string;

  @Prop()
  readonly token: string;

  constructor(sessionHash: string, token: string) {
    this.sessionHash = sessionHash;
    this.token = token;
  }
}

export const TokenSchema = SchemaFactory.createForClass(Token);
