import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContainerDto } from '../models/containerDto';
import { CardDto } from '../models/cardDto';

@Injectable({
  providedIn: 'root'
})
export class SessionHttpService {

  constructor(private readonly client: HttpClient) {

  }

  createSession(secretString: string): Observable<string> {
    const body = {
      secret: secretString
    };

    return this.client.post('http://localhost:3000/session/new', body)
      .pipe(
        map(response => response['hash'])
      );
  }

  createContainer(hash: string, name: string): Observable<void> {
    const body = {
      name: name
    };

    return this.client.post(`http://localhost:3000/session/${hash}/containers`, body)
      .pipe(map(() => null));
  }

  getContainers(hash: string): Observable<Array<ContainerDto>> {
    return this.client.get(`http://localhost:3000/session/${hash}/containers`)
      .pipe(map(obj => obj as Array<ContainerDto>));
  }

  deleteContainer(hash: string, containerHash: string): Observable<void> {
    return this.client.delete(`http://localhost:3000/session/${hash}/containers/${containerHash}`)
      .pipe(map(() => null));
  }

  getCards(hash: string): Observable<Array<CardDto>> {
    return this.client.get(`http://localhost:3000/session/${hash}/cards`)
      .pipe(map(obj => obj as Array<CardDto>));
  }

  createCard(hash: string, containerHash: string, text: string): Observable<void> {
    const body = {
      containerHash: containerHash,
      text: text
    };

    return this.client.post(`http://localhost:3000/session/${hash}/cards`, body)
      .pipe(map(() => null));
  }
}
