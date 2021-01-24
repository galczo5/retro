import { Injectable } from '@angular/core';
import { SessionHttpService } from './session-http.service';
import { SessionHashService } from '../session/session-hash.service';
import { Observable } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CardsVisibleService {

  private cardsVisible: boolean = false;

  constructor(private readonly httpService: SessionHttpService,
              private readonly sessionHashService: SessionHashService) {
  }

  setCardsVisible(cardsVisible: boolean) {
    this.cardsVisible = cardsVisible;
  }

  getCardsVisible(): boolean {
    return this.cardsVisible;
  }

  toggle(): Observable<void> {
    return this.sessionHashService.getHash()
      .pipe(
        take(1),
        switchMap(hash => {
          if (this.cardsVisible) {
            return this.httpService.stop(hash);
          } else {
            return this.httpService.run(hash);
          }
        }),
        tap(() => {
          this.cardsVisible = !this.cardsVisible;
        })
      )
  }
}
