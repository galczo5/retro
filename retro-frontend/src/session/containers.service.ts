import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Container } from '../models/container';
import { SessionHttpService } from '../app/session-http.service';
import { SessionHashService } from './session-hash.service';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContainersService {

  private readonly containers$: ReplaySubject<Array<Container>> = new ReplaySubject<Array<Container>>(1);

  constructor(private readonly httpService: SessionHttpService,
              private readonly sessionHashService: SessionHashService) { }

  fetch(): void {
    this.sessionHashService.getHash()
      .pipe(
        take(1),
        switchMap(hash => this.httpService.getContainers(hash))
      )
      .subscribe(dtos => {
        const containers = dtos.map(dto => new Container(dto.hash, dto.sessionHash, dto.name));
        this.containers$.next(containers);
      })
  }

  getContainers(): Observable<Array<Container>> {
    return this.containers$.asObservable();
  }
}
