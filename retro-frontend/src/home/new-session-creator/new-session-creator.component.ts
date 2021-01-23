import { Component, OnInit } from '@angular/core';
import { SessionHttpService } from '../session-http.service';

@Component({
  selector: 'app-new-session-creator',
  templateUrl: './new-session-creator.component.html',
  styleUrls: ['./new-session-creator.component.css']
})
export class NewSessionCreatorComponent {

  constructor(private readonly httpService: SessionHttpService) { }

  createSession(secretInput: HTMLInputElement): void {
    this.httpService.createSession(secretInput.value)
      .subscribe(hash => {
        console.log(hash);
      });
  }

}
