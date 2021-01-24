import { Component, OnInit } from '@angular/core';
import { EditorRoleService } from '../../app/editor-role.service';
import { CardsVisibleService } from '../../app/cards-visible.service';

@Component({
  selector: 'app-session-control-panel',
  templateUrl: './session-control-panel.component.html',
  styleUrls: ['./session-control-panel.component.css']
})
export class SessionControlPanelComponent implements OnInit {

  canEdit: boolean = false;
  cardsVisible: boolean = false;

  constructor(private readonly editorRoleService: EditorRoleService,
              private readonly cardsVisibleService: CardsVisibleService) { }

  ngOnInit(): void {
    this.canEdit = this.editorRoleService.canEdit();
    this.cardsVisible = this.cardsVisibleService.getCardsVisible();
  }

  toggle(): void {
    this.cardsVisibleService.toggle()
      .subscribe(() => {
        this.cardsVisible = this.cardsVisibleService.getCardsVisible();
      })
  }

}
