import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Subject, timer} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-share-button',
  templateUrl: './share-button.component.html',
  styleUrls: ['./share-button.component.css']
})
export class ShareButtonComponent implements OnInit, OnDestroy {

  location: string;
  copied: boolean = false;

  private readonly onDestroy$: Subject<void> = new Subject<void>();

  constructor(@Inject(DOCUMENT) private readonly document: Document,
              private readonly router: Router) {
  }

  ngOnInit(): void {
    this.setLocation();

    this.router.events
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.setLocation();
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  copy(inputElement: HTMLInputElement): void {
    inputElement.select();
    inputElement.setSelectionRange(0, 99999);
    this.document.execCommand('copy');
    inputElement.blur();

    this.copied = true;
    this.location = 'Copied to clipboard!';
    timer(2000)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.copied = false;
        this.setLocation();
      });
  }

  private setLocation(): void {
    const locationString = location.toString();
    if (locationString.indexOf('/session') !== -1) {
      const chunks = locationString.split('/');
      const sessionIndex = chunks.indexOf('session');
      this.location = chunks.slice(0, sessionIndex + 2).join('/');
    } else {
      this.location = '';
    }
  }
}
