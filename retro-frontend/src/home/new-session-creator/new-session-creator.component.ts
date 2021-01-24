import {Component} from '@angular/core';
import {SessionHttpService} from '../../app/session-http.service';
import {Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-new-session-creator',
  templateUrl: './new-session-creator.component.html',
  styleUrls: ['./new-session-creator.component.css']
})
export class NewSessionCreatorComponent {

  constructor(private readonly httpService: SessionHttpService,
              private readonly router: Router) {
  }

  createSession(secretInput: HTMLInputElement): void {
    this.httpService.createSession(secretInput.value)
      .pipe(
        switchMap(hash => {
          return this.auth(hash, secretInput);
        })
      )
      .subscribe(hash =>
        this.router.navigateByUrl(`/session/${hash}`)
      );
  }

  private auth(hash: string, secretInput: HTMLInputElement): Observable<string> {
    return this.httpService.auth(hash, secretInput.value)
      .pipe(
        switchMap(token => {
          this.setToken(hash, token);
          return of(hash);
        })
      );
  }

  private setToken(hash: string, token: string): void {
    localStorage.setItem(hash, token);
  }
}
