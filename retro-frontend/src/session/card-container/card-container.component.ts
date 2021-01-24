import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SessionHttpService } from '../../app/session-http.service';
import { ContainersService } from '../containers.service';
import { Card } from '../../models/card';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.css']
})
export class CardContainerComponent {

  @Input()
  sessionHash: string;

  @Input()
  hash: string;

  @Input()
  header: string;

  @Input()
  cards: Array<Card> = [];

  @Output()
  cardDropped: EventEmitter<string> = new EventEmitter<string>();

  dropActive: boolean = false;

  constructor(private readonly httpService: SessionHttpService,
              private readonly containersService: ContainersService) { }

  deleteContainer(): void {
    this.httpService.deleteContainer(this.sessionHash, this.hash)
      .subscribe(() => {
        this.containersService.fetch();
      });
  }

  getCards(mod: number): Array<Card> {
    return this.cards.filter((value, index) => index % 2 === mod);
  }

  getCounter(): string {
    return this.cards.length + (this.cards.length === 1 ? ' thought' : ' thoughts')
  }

  dropped(event: string) {
    this.cardDropped.emit(event);
  }

  setDropActive(value: boolean): void {
    this.dropActive = value;
  }
}
