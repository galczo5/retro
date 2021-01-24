import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { Card, CardDocument } from '../../model/card';

@Injectable()
export class CardRepositoryService {

  constructor(@InjectModel(Card.name) private cardModel: Model<CardDocument>) {
  }

  create(card: Card): Promise<CardDocument> {
    return this.cardModel.create(card);
  }

  merge(hash: string, cardToDeleteHash: string, cardToUpdateHash: string, text: string): Promise<void> {
    const promise = new Promise<void>((resolve, reject) => {
      const query = { sessionHash: hash, hash: cardToDeleteHash };
      this.cardModel.findOneAndRemove(query, { upsert: false }, (err) => {
        if (err) {
          reject(err);
          return;
        }

        resolve();
      })
    });

    return promise.then(() => {
      return new Promise<void>((resolve, reject) => {
        const query = { sessionHash: hash, hash: cardToUpdateHash };
        this.cardModel.findOneAndUpdate(query, { text: text }, { upsert: false }, (err) => {
          if (err) {
            reject(err);
            return;
          }

          resolve();
        });
      });
    });
  }

  updateContainerHash(hash: string, cardHash: string, containerHash: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const query = { sessionHash: hash, hash: cardHash };
      this.cardModel.findOneAndUpdate(query, { containerHash: containerHash }, { upsert: false }, (err) => {
        if (err) {
          reject(err);
          return;
        }

        resolve();
      });
    });
  }

  getCardsBySessionHash(hash: string): Promise<Array<CardDocument>> {
    return new Promise<Array<CardDocument>>((resolve, reject) => {
      this.cardModel.where('sessionHash', hash).find((err, cards) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(cards);
      })
    });
  }
}
