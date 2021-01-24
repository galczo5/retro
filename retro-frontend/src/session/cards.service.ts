import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {SessionHttpService} from '../app/session-http.service';
import {SessionHashService} from './session-hash.service';
import {map, switchMap, take} from 'rxjs/operators';
import {Card} from '../models/card';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  private readonly cards$: ReplaySubject<Array<Card>> = new ReplaySubject<Array<Card>>(1);

  constructor(private readonly httpService: SessionHttpService,
              private readonly sessionHashService: SessionHashService) {
  }

  fetch(): void {
    this.sessionHashService.getHash()
      .pipe(
        take(1),
        switchMap(hash => this.httpService.getCards(hash))
      )
      .subscribe(dtos => {
        const cards = dtos.map(dto => new Card(dto.hash, dto.containerHash, dto.sessionHash, dto.text));
        this.cards$.next(cards);
      });
  }

  move(hash: string, containerHash: string, cardHash: string): void {
    this.sessionHashService.getHash()
      .pipe(
        take(1),
        switchMap(sessionHash => this.httpService.moveCard(sessionHash, containerHash, cardHash))
      )
      .subscribe(() => {
        this.fetch();
      });
  }

  merge(cardToDeleteHash: string, cardToUpdateHash: string, text: string): void {
    this.sessionHashService.getHash()
      .pipe(
        take(1),
        switchMap(hash => this.httpService.mergeCards(hash, cardToDeleteHash, cardToUpdateHash, text))
      )
      .subscribe(() => {
        this.fetch();
      });
  }


  getCards(): Observable<Array<Card>> {
    return this.cards$.asObservable();
  }
}
