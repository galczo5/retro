import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContainerDocument = Container & Document;

@Schema()
export class Container {

  @Prop()
  readonly hash: string;

  @Prop()
  readonly sessionHash: string;

  @Prop()
  readonly name: string;

  constructor(hash: string, sessionHash: string, name: string) {
    this.hash = hash;
    this.sessionHash = sessionHash;
    this.name = name;
  }
}

export const ContainerSchema = SchemaFactory.createForClass(Container);
