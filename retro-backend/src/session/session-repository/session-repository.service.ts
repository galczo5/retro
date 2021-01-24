import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Session, SessionDocument } from '../../model/session';
import { Model } from 'mongoose';

@Injectable()
export class SessionRepositoryService {

  constructor(@InjectModel(Session.name) private sessionModel: Model<SessionDocument>) {}

  create(session: Session): Promise<SessionDocument> {
    return this.sessionModel.create(session);
  }

  cardsVisible(hash: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.sessionModel.where('hash', hash).findOne((err, session: SessionDocument) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(session.cardsVisible);
      });
    })
  }

  async run(hash: string): Promise<void> {
    return this.setCardsVisibility(hash, true);
  }

  async stop(hash: string): Promise<void> {
    return this.setCardsVisibility(hash, false)
  }

  private setCardsVisibility(hash: string, visible: boolean) {
    return new Promise<void>((resolve, reject) => {
      const query = { hash: hash };
      this.sessionModel.findOneAndUpdate(query, { cardsVisible: visible }, { upsert: false }, (err) => {
        if (err) {
          reject();
          return;
        }

        resolve();
      });
    });
  }
}
