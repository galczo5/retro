import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {CardsContainer} from '../models/cardsContainer';
import {SessionHttpService} from '../app/session-http.service';
import {SessionHashService} from './session-hash.service';
import {map, switchMap, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContainersService {

  private readonly containers$: ReplaySubject<Array<CardsContainer>> = new ReplaySubject<Array<CardsContainer>>(1);

  constructor(private readonly httpService: SessionHttpService,
              private readonly sessionHashService: SessionHashService) {
  }

  fetch(): void {
    this.sessionHashService.getHash()
      .pipe(
        take(1),
        switchMap(hash => this.httpService.getContainers(hash))
      )
      .subscribe(dtos => {
        const containers = dtos.map(dto => new CardsContainer(dto.hash, dto.sessionHash, dto.name));
        this.containers$.next(containers);
      });
  }

  getContainers(): Observable<Array<CardsContainer>> {
    return this.containers$.asObservable();
  }
}
