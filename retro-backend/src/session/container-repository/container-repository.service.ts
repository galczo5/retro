import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Container, ContainerDocument } from '../../model/container';
import { Model } from "mongoose";

@Injectable()
export class ContainerRepositoryService {

  constructor(@InjectModel(Container.name) private containerModel: Model<ContainerDocument>) {
  }

  create(container: Container): Promise<ContainerDocument> {
    return this.containerModel.create(container);
  }

  getContainersBySessionHash(hash: string): Promise<Array<ContainerDocument>> {
    return new Promise<Array<ContainerDocument>>((resolve, reject) => {
      this.containerModel.where('sessionHash', hash).find((err, session) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(session);
      });
    });
  }

  delete(hash: string, containerHash: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.containerModel.where('sessionHash', hash)
        .where('hash', containerHash)
        .deleteOne((err) => {
          if (err) {
            reject(err);
            return;
          }

          resolve();
        });
    });
  }
}
