import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SessionHttpService} from '../../app/session-http.service';
import {SessionHashService} from '../session-hash.service';
import {switchMap, take} from 'rxjs/operators';
import {Location} from '@angular/common';

@Component({
  selector: 'app-new-container-creator',
  templateUrl: './new-container-creator.component.html'
})
export class NewContainerCreatorComponent implements AfterViewInit {

  @ViewChild('input', { read: ElementRef })
  inputElement: ElementRef;

  constructor(private readonly httpService: SessionHttpService,
              private readonly sessionHashService: SessionHashService,
              private readonly location: Location) {
  }

  ngAfterViewInit(): void {
    const nativeElement = this.inputElement.nativeElement as HTMLInputElement;
    nativeElement.focus();
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
      });
  }

  onKeyDown($event: KeyboardEvent): void {
    if ($event.key.toLocaleLowerCase() === 'enter') {
      this.createContainer(this.inputElement.nativeElement as HTMLInputElement);
    }
  }
}
