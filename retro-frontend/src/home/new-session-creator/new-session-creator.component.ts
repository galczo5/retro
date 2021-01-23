import { Component, OnInit } from '@angular/core';
import { SessionHttpService } from '../../app/session-http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-session-creator',
  templateUrl: './new-session-creator.component.html',
  styleUrls: ['./new-session-creator.component.css']
})
export class NewSessionCreatorComponent {

  constructor(private readonly httpService: SessionHttpService,
              private readonly router: Router) { }

  createSession(secretInput: HTMLInputElement): void {
    this.httpService.createSession(secretInput.value)
      .subscribe(hash =>
        this.router.navigateByUrl(`/session/${hash}`)
      );
  }

}
