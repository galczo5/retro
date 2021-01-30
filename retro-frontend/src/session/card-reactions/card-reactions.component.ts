import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-reactions',
  templateUrl: './card-reactions.component.html',
  styleUrls: ['./card-reactions.component.css'],
  host: {
    '[class.flex]': 'true',
    '[class.justify-end]': 'true'
  }
})
export class CardReactionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
