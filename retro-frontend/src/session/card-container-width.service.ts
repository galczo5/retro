import { Injectable } from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CardContainerWidthService {

  private readonly width$: ReplaySubject<number> = new ReplaySubject<number>(1);

  constructor() {
  }

  set(width: number): void {
    localStorage.setItem('container-width', width.toString());
    this.width$.next(width);
  }

  get(): Observable<number> {

    const item = localStorage.getItem('container-width') || '600';
    this.width$.next(Number(item));

    return this.width$.pipe(distinctUntilChanged());
  }
}
