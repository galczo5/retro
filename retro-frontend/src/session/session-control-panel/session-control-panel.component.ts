import {Component, OnInit} from '@angular/core';
import {EditorRoleService} from '../../app/editor-role.service';
import {CardsVisibleService} from '../../app/cards-visible.service';
import {Location} from '@angular/common';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-session-control-panel',
  templateUrl: './session-control-panel.component.html',
  styleUrls: ['./session-control-panel.component.css']
})
export class SessionControlPanelComponent implements OnInit {

  canEdit = false;
  cardsVisible = false;
  share = false;
  link: string;

  constructor(private readonly editorRoleService: EditorRoleService,
              private readonly cardsVisibleService: CardsVisibleService,
              private readonly translateService: TranslateService,
              private readonly location: Location) {
  }

  ngOnInit(): void {
    this.canEdit = this.editorRoleService.canEdit();
    this.cardsVisible = this.cardsVisibleService.getCardsVisible();
    this.link = location.toString();
  }

  toggle(): void {
    this.cardsVisibleService.toggle()
      .subscribe(() => {
        this.cardsVisible = this.cardsVisibleService.getCardsVisible();
      });
  }

  setLanguage(lang: string): void {
    this.translateService.use(lang);
  }

  toggleShare(): void {
    this.share = !this.share;
  }

}
