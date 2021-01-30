import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-shortcut-label',
  templateUrl: './shortcut-label.component.html'
})
export class ShortcutLabelComponent implements OnInit {

  @Input()
  shortcut: string;

  @Input()
  description: string;

  constructor() { }

  ngOnInit(): void {
  }

}
