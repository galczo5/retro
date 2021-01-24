import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SessionHttpService } from '../../app/session-http.service';
import { ContainersService } from '../containers.service';
import { Card } from '../../models/card';
import { EditorRoleService } from '../../app/editor-role.service';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.css']
})
export class CardContainerComponent implements OnInit {

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

  canEdit: boolean = false;

  constructor(private readonly httpService: SessionHttpService,
              private readonly containersService: ContainersService,
              private readonly editorRoleService: EditorRoleService) { }

  ngOnInit(): void {
    this.canEdit = this.editorRoleService.canEdit();
  }

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
