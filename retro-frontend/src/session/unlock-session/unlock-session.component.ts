import { Component, OnInit } from '@angular/core';
import { SessionHttpService } from '../../app/session-http.service';
import { SessionHashService } from '../session-hash.service';
import { switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { EditorRoleService } from '../../app/editor-role.service';

@Component({
  selector: 'app-unlock-session',
  templateUrl: './unlock-session.component.html',
  styleUrls: ['./unlock-session.component.css']
})
export class UnlockSessionComponent implements OnInit {

  constructor(private readonly httpService: SessionHttpService,
              private readonly sessionHashService: SessionHashService,
              private readonly editorRoleService: EditorRoleService,
              private readonly location: Location) { }

  ngOnInit(): void {}

  unlockSession(input: HTMLInputElement) {
    this.sessionHashService.getHash()
      .pipe(
        switchMap(hash => {
          return this.httpService.auth(hash, input.value)
            .pipe(
              switchMap(token => {
                localStorage.setItem(hash, token);
                return of(token);
              })
            );
        })
      )
      .subscribe(token => {
        this.editorRoleService.setToken(token);
        this.location.back();
      });
  }

}
