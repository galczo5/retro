import { Component, Input, OnInit } from '@angular/core';

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
  alternative: boolean = false;

  getClass(): string {
    return this.alternative ? 'bg-white rounded p-3 text-indigo-500' : 'bg-indigo-500 rounded p-3 text-white';
  }

}
