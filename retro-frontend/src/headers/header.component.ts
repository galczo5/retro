import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <h1 class="px-3 sm:px-0 dark:text-gray-200 text-4xl text-center mb-10">
      <ng-content></ng-content>
    </h1>
  `,
  styles: []
})
export class HeaderComponent {

}
