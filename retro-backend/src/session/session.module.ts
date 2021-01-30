import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Session, SessionSchema } from '../model/session';
import { DefaultSessionFactoryService } from './default-session-factory/default-session-factory.service';
import { HashGeneratorService } from './hash-generator/hash-generator.service';
import { SessionController } from './session.controller';
import { SessionRepositoryService } from './session-repository/session-repository.service';
import { ContainerRepositoryService } from './container-repository/container-repository.service';
import { Container, ContainerSchema } from '../model/container';
import { Card, CardSchema } from '../model/card';
import { CardRepositoryService } from './card-repository/card-repository.service';
import { Token, TokenSchema } from '../model/tokens';
import { TokenController } from './token.controller';
import { TokenRepositoryService } from './token-repository/token-repository.service';
import { UserAuthService } from './user-auth/user-auth.service';
import { CardReactionRepositoryService } from './card-reaction-repository/card-reaction-repository.service';
import {CardReaction, CardReactionSchema} from "../model/cardReaction";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Session.name, schema: SessionSchema },
      { name: Container.name, schema: ContainerSchema },
      { name: Card.name, schema: CardSchema },
      { name: Token.name, schema: TokenSchema },
      { name: CardReaction.name, schema: CardReactionSchema }
    ]),
  ],
  providers: [DefaultSessionFactoryService, HashGeneratorService, SessionRepositoryService, ContainerRepositoryService, CardRepositoryService, TokenRepositoryService, UserAuthService, CardReactionRepositoryService],
  controllers: [SessionController, TokenController],
})
export class SessionModule {

  constructor() {
  }

}
