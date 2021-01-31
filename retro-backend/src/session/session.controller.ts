import { Body, Controller, Delete, Get, Headers, HttpException, Param, Post, Req } from '@nestjs/common';
import { GenerateRequest } from './request/generateRequest';
import { DefaultSessionFactoryService } from './default-session-factory/default-session-factory.service';
import { GenerateResponse } from './response/generateResponse';
import { SessionRepositoryService } from './session-repository/session-repository.service';
import { ContainerRepositoryService } from './container-repository/container-repository.service';
import { CardRepositoryService } from './card-repository/card-repository.service';
import { UserAuthService } from './user-auth/user-auth.service';
import {CardReactionRepositoryService} from "./card-reaction-repository/card-reaction-repository.service";
import {Reaction} from "../model/cardReaction";

@Controller('session')
export class SessionController {

  constructor(private readonly defaultSessionFactoryService: DefaultSessionFactoryService,
              private readonly sessionRepositoryService: SessionRepositoryService,
              private readonly containerRepositoryService: ContainerRepositoryService,
              private readonly cardRepositoryService: CardRepositoryService,
              private readonly cardReactionRepositoryService: CardReactionRepositoryService,
              private readonly authService: UserAuthService) {
  }

  @Post('new')
  async generate(@Body() generateRequest: GenerateRequest) {
    const session = this.defaultSessionFactoryService.createSession(generateRequest.secret);
    await this.sessionRepositoryService.create(session);

    const containers = this.defaultSessionFactoryService.createContainers(session.hash);

    for (const container of containers) {
      await this.containerRepositoryService.create(container);
    }

    return new GenerateResponse(session.hash);
  }

  @Get(':hash/containers')
  async containers(@Param('hash') hash: string) {
    return await this.containerRepositoryService.getContainersBySessionHash(hash);
  }

  @Post(':hash/containers')
  async newContainer(@Param('hash') hash: string, @Headers('User-Token') token: string, @Body() body: { name: string }) {
    try {
      await this.authService.throwIfNotAllowed(hash, token);
      return await this.containerRepositoryService.create(
        this.defaultSessionFactoryService.createContainer(hash, body.name)
      );
    } catch (e) {
      throw new HttpException(e, 401);
    }
  }

  @Delete(':hash/containers/:containerHash')
  async deleteContainer(@Param('hash') hash: string, @Headers('User-Token') token: string, @Param('containerHash') containerHash: string) {
    try {
      await this.authService.throwIfNotAllowed(hash, token);
      return await this.containerRepositoryService.delete(hash, containerHash);
    } catch (e) {
      throw new HttpException(e, 401);
    }
  }

  @Get(':hash/cards')
  async cards(@Param('hash') hash: string, @Headers('User-Token') token: string, @Headers('User-Id') userId: string) {
    const cards = await this.cardRepositoryService.getCardsBySessionHash(hash);
    try {
      await this.authService.throwIfNotAllowed(hash, token);
      return cards;
    } catch (e) {
      const cardsVisible = await this.sessionRepositoryService.cardsVisible(hash);
      return cards.filter(c => c.creator === userId || cardsVisible);
    }
  }

  @Post(':hash/cards')
  async newCard(
    @Param('hash') hash: string,
    @Headers('User-Id') creator: string,
    @Headers('User-Token') token: string,
    @Body() body: { containerHash: string, text: string }
  ) {
    const card = this.defaultSessionFactoryService.createCard(
      hash,
      body.containerHash,
      body.text,
      creator
    );

    return await this.cardRepositoryService.create(card);
  }

  @Post(':hash/cards/move')
  async moveCard(
    @Param('hash') hash: string,
    @Headers('User-Id') creator: string,
    @Headers('User-Token') token: string,
    @Body() body: { cardHash: string, containerHash: string }
  ) {
    try {
      await this.authService.throwIfNotAllowed(hash, token);
      return await this.cardRepositoryService.updateContainerHash(hash, body.cardHash, body.containerHash);
    } catch (e) {
      throw new HttpException(e, 401);
    }
  }

  @Post(':hash/cards/merge')
  async mergeCards(
    @Param('hash') hash: string,
    @Headers('User-Token') token: string,
    @Body() body: { cardToDeleteHash: string, cardToUpdateHash: string, text: string },
  ) {
    try {
      await this.authService.throwIfNotAllowed(hash, token);
      return await this.cardRepositoryService.merge(hash, body.cardToDeleteHash, body.cardToUpdateHash, body.text);
    } catch (e) {
      throw new HttpException(e, 401);
    }
  }

  @Get(':hash')
  async get(@Param('hash') hash: string) {
    const cardsVisible = await this.sessionRepositoryService.cardsVisible(hash);
    return {
      cardsVisible: cardsVisible
    };
  }

  @Post(':hash/run')
  async run(@Param('hash') hash: string, @Headers('User-Token') token: string) {
    try {
      await this.authService.throwIfNotAllowed(hash, token);
      return await this.sessionRepositoryService.run(hash);
    } catch (e) {
      throw new HttpException(e, 401);
    }
  }

  @Post(':hash/stop')
  async stop(@Param('hash') hash: string, @Headers('User-Token') token: string,) {
    try {
      await this.authService.throwIfNotAllowed(hash, token);
      return await this.sessionRepositoryService.stop(hash);
    } catch (e) {
      throw new HttpException(e, 401);
    }
  }

  @Post(':hash/cards/:cardHash/reaction')
  async toggle(
      @Param('hash') hash: string,
      @Param('cardHash') cardHash: string,
      @Headers('User-Id') creator: string,
      @Body() body: { reaction: Reaction }) {
    return await this.cardReactionRepositoryService.toggle(hash, cardHash, body.reaction, creator);
  }

  @Get(':hash/cardReactions')
  async cardReactions(@Param('hash') hash: string) {
    return await this.cardReactionRepositoryService.getAll(hash);
  }

}
