import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-create-card-button',
  templateUrl: './create-card-button.component.html'
})
export class CreateCardButtonComponent implements OnInit {

  @Input()
  hash: string;

  constructor() { }

  ngOnInit(): void {
  }

}
