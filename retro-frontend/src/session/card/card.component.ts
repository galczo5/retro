import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input()
  hash: string;

  @Input()
  text: string;

  dropActive: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onDrop($event: any) {
    console.log('card', $event);
  }

  setDropActive(value: boolean): void {
    this.dropActive = value;
  }
}
