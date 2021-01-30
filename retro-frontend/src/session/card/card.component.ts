import {Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {ActivatedRoute, Router} from '@angular/router';
import {Reaction} from "../../models/reaction";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html'
})
export class CardComponent implements OnInit {

  @Input()
  hash: string;

  @Input()
  text: string;

  @Input()
  reactions: Array<Reaction> = [];

  dropActive = false;

  constructor(private readonly router: Router,
              private readonly activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  onDrop(event: string): void {
    if (this.hash === event) {
      return;
    }

    this.router.navigate(['merge-cards', this.hash, event], {relativeTo: this.activatedRoute});
  }

  setDropActive(value: boolean): void {
    this.dropActive = value;
  }
}
