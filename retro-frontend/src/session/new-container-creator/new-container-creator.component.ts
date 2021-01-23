import { Component, OnInit } from '@angular/core';
import { SessionHttpService } from '../../app/session-http.service';
import { SessionHashService } from '../session-hash.service';
import { switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-container-creator',
  templateUrl: './new-container-creator.component.html',
  styleUrls: ['./new-container-creator.component.css']
})
export class NewContainerCreatorComponent implements OnInit {

  constructor(private readonly httpService: SessionHttpService,
              private readonly sessionHashService: SessionHashService,
              private readonly location: Location) { }

  ngOnInit(): void {
  }

  createContainer(input: HTMLInputElement): void {

    this.sessionHashService.getHash()
      .pipe(
        take(1),
        switchMap(hash =>
          this.httpService.createContainer(hash, input.value)
        )
      )
      .subscribe(() => {
        this.location.back();
      })
  }

}
