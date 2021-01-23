import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionHashService {

  private readonly hash$: ReplaySubject<string> = new ReplaySubject<string>(1);

  setHash(hash: string): void {
    this.hash$.next(hash);
  }

  getHash(): Observable<string> {
    return this.hash$.asObservable();
  }

}
