import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
}
