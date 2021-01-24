import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { Token, TokenDocument } from '../../model/tokens';
import { Session, SessionDocument } from '../../model/session';
import { SHA256 } from 'crypto-js';
import { HashGeneratorService } from '../hash-generator/hash-generator.service';

@Injectable()
export class TokenRepositoryService {

  constructor(@InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
              @InjectModel(Session.name) private sessionModel: Model<SessionDocument>,
              private readonly hashGeneratorService: HashGeneratorService) {
  }

  validate(sessionHash: string, token: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.tokenModel.where('sessionHash', sessionHash).findOne((err, document: TokenDocument) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(document && token === document.token);
      });
    })
  }

  getToken(sessionHash: string, secret: string): Promise<string> {
    const hashedSecret = SHA256(secret).toString();

    return new Promise<string>((resolve, reject) => {

      this.tokenModel.where('sessionHash', sessionHash).deleteMany(() => {
        this.sessionModel.where('hash', sessionHash).findOne((err, session: SessionDocument) => {
          if (err) {
            reject('Wrong session hash or secret');
            return;
          }
          if (hashedSecret === session.secret) {
            const uuid = this.hashGeneratorService.getUUID();

            this.tokenModel.create(new Token(sessionHash, uuid))
              .then(token => resolve(token.token));

          } else {
            reject('Wrong session hash or secret');
          }
        })
      });
    });
  }

}
