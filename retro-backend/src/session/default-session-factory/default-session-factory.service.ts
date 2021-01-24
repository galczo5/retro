import { SHA256 } from 'crypto-js';

import { Injectable } from '@nestjs/common';
import { Session } from '../../model/session';
import { Container } from '../../model/container';
import { HashGeneratorService } from '../hash-generator/hash-generator.service';
import { Card } from '../../model/card';

@Injectable()
export class DefaultSessionFactoryService {

  constructor(private readonly hashGeneratorService: HashGeneratorService) {}

  createSession(secret: string): Session {

    const hash = this.hashGeneratorService.getUUID();
    const hashedSecret = SHA256(secret).toString();

    return new Session(hash, hashedSecret, false);
  }

  createContainers(hash: string): Array<Container> {
    return [
      new Container(this.hashGeneratorService.getUUID(), hash, 'I want to continue'),
      new Container(this.hashGeneratorService.getUUID(), hash, 'I want to improve'),
      new Container(this.hashGeneratorService.getUUID(), hash, 'I have an idea'),
    ];
  }

  createContainer(hash: string, name: string): Container {
    return new Container(this.hashGeneratorService.getUUID(), hash, name);
  }

  createCard(hash: string, containerHash: string, text: string, creator: string): Card {
    return new Card(this.hashGeneratorService.getUUID(), containerHash, hash, text, creator);
  }

}
