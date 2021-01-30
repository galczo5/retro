import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {CardReaction, CardReactionDocument, Reaction} from "../../model/cardReaction";
import {Model} from "mongoose";

@Injectable()
export class CardReactionRepositoryService {

    constructor(@InjectModel(CardReaction.name) private readonly cardReactionDocumentModel: Model<CardReactionDocument>) {
    }

    getAll(sessionHash: string): Promise<Array<CardReactionDocument>> {
        return new Promise<Array<CardReactionDocument>>((resolve, reject) => {
            this.cardReactionDocumentModel
                .where('sessionHash', sessionHash)
                .find((err, data) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve(data);
                });
        });
    }

    toggle(sessionHash: string, cardHash: string, reaction: Reaction, token: string): Promise<void> {
        const query = {
            'cardHash': cardHash,
            'reaction': reaction,
            'creator': token
        };

        return new Promise<void>((resolve, reject) => {
            this.cardReactionDocumentModel.count(query, (err, exists) => {
                if (!exists) {
                    this.cardReactionDocumentModel.create(new CardReaction(sessionHash, cardHash, reaction, token))
                        .then(() => resolve());
                } else {
                    this.cardReactionDocumentModel.deleteMany(query, { upsert: false }, (err) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve();
                    });
                }
            })
        });
    }

}
