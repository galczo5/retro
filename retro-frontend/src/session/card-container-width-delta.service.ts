import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

export type WidthDelta = {
  containerHash: string,
  delta: number
};

@Injectable({
  providedIn: 'root'
})
export class CardContainerWidthDeltaService {

  private delta$: Subject<WidthDelta> = new Subject<WidthDelta>();

  set(hash: string, delta: number): void {
    this.delta$.next({ containerHash: hash, delta: delta });
  }

  get(): Observable<WidthDelta> {
    return this.delta$.asObservable();
  }
}
