import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button [class]="getClass()">
      <ng-content></ng-content>
    </button>
  `
})
export class ButtonComponent {

  @Input()
  alternative = false;

  getClass(): string {
    return this.alternative
      ? 'bg-white dark:bg-gray-600 dark:text-gray-200 rounded p-3 text-indigo-500'
      : 'bg-indigo-500 dark:bg-gray-800 dark:text-gray-200  rounded p-3 text-white';
  }

}
