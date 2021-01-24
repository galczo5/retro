import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ContainerDto} from '../models/containerDto';
import {CardDto} from '../models/cardDto';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionHttpService {

  constructor(private readonly client: HttpClient) {
  }

  cardsVisible(hash: string): Observable<boolean> {
    return this.client.get(`${this.getApiUrl()}/session/${hash}`)
      .pipe(map(response => response.cardsVisible));
  }

  run(hash: string): Observable<void> {
    return this.client.post(`${this.getApiUrl()}/session/${hash}/run`, {})
      .pipe(map(() => null));
  }

  stop(hash: string): Observable<void> {
    return this.client.post(`${this.getApiUrl()}/session/${hash}/stop`, {})
      .pipe(map(() => null));
  }

  createSession(secretString: string): Observable<string> {
    const body = {
      secret: secretString
    };

    return this.client.post(`${this.getApiUrl()}/session/new`, body)
      .pipe(map(response => response.hash));
  }

  auth(hash: string, secretString: string): Observable<string> {
    const body = {
      secret: secretString
    };

    return this.client.post(`${this.getApiUrl()}/token/auth/${hash}`, body)
      .pipe(map(response => response.token));
  }

  createContainer(hash: string, name: string): Observable<void> {
    const body = {
      name
    };

    return this.client.post(`${this.getApiUrl()}/session/${hash}/containers`, body)
      .pipe(map(() => null));
  }

  getContainers(hash: string): Observable<Array<ContainerDto>> {
    return this.client.get(`${this.getApiUrl()}/session/${hash}/containers`)
      .pipe(map(obj => obj as Array<ContainerDto>));
  }

  deleteContainer(hash: string, containerHash: string): Observable<void> {
    return this.client.delete(`${this.getApiUrl()}/session/${hash}/containers/${containerHash}`)
      .pipe(map(() => null));
  }

  getCards(hash: string): Observable<Array<CardDto>> {
    return this.client.get(`${this.getApiUrl()}/session/${hash}/cards`)
      .pipe(map(obj => obj as Array<CardDto>));
  }

  createCard(hash: string, containerHash: string, text: string): Observable<void> {
    const body = {
      containerHash,
      text
    };

    return this.client.post(`${this.getApiUrl()}/session/${hash}/cards`, body)
      .pipe(map(() => null));
  }

  moveCard(hash: string, containerHash: string, cardHash: string): Observable<void> {
    const body = {
      containerHash,
      cardHash
    };

    return this.client.post(`${this.getApiUrl()}/session/${hash}/cards/move`, body)
      .pipe(map(() => null));
  }

  mergeCards(hash: string, cardToDeleteHash: string, cardToUpdateHash: string, text: string): Observable<void> {
    const body = {
      cardToDeleteHash,
      cardToUpdateHash,
      text
    };

    return this.client.post(`${this.getApiUrl()}/session/${hash}/cards/merge`, body)
      .pipe(map(() => null));
  }

  private getApiUrl(): string {
    return environment.apiUrl;
  }
}
