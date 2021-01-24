import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionHashService {

  private readonly hash$: ReplaySubject<string> = new ReplaySubject<string>(1);

  getHash(): Observable<string> {
    return this.hash$.asObservable();
  }

  setHash(hash: string): void {
    this.hash$.next(hash);
  }

}
