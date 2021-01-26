import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject, timer} from 'rxjs';
import {delay, takeUntil, tap} from 'rxjs/operators';

@Component({
  selector: 'app-save-label',
  templateUrl: './save-label.component.html',
  styleUrls: ['./save-label.component.css']
})
export class SaveLabelComponent implements OnDestroy {

  @Input()
  text: string;

  @Output()
  saved: EventEmitter<void> = new EventEmitter<void>();

  state: 'idle' | 'saving' | 'saved' = 'idle';

  private readonly onDestroy$: Subject<void> = new Subject<void>();

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  startSave(): void {
    this.state = 'saving';
  }

  endSave(): void {
    timer(500)
      .pipe(
        tap(() => {
          this.state = 'saved';
          this.saved.emit();
        }),
        delay(2000),
        takeUntil(this.onDestroy$)
      )
      .subscribe(() => {
        this.state = 'idle';
      });
  }

}
