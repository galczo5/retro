import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {SessionHttpService} from '../../app/session-http.service';
import {Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-new-session-creator',
  templateUrl: './new-session-creator.component.html',
  styleUrls: ['./new-session-creator.component.css']
})
export class NewSessionCreatorComponent implements AfterViewInit {

  @ViewChild('input', { read: ElementRef })
  inputElement: ElementRef;

  constructor(private readonly httpService: SessionHttpService,
              private readonly router: Router) {
  }

  ngAfterViewInit(): void {
    const nativeElement = this.inputElement.nativeElement as HTMLInputElement;
    nativeElement.focus();
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

  onKeyDown($event: KeyboardEvent): void {
    if ($event.key.toLocaleLowerCase() === 'enter') {
      this.createSession(this.inputElement.nativeElement as HTMLInputElement);
    }
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
