import {NgModule, SecurityContext} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SessionComponent} from './session/session.component';
import {RouterModule} from '@angular/router';
import {CardContainerComponent} from './card-container/card-container.component';
import {CardComponent} from './card/card.component';
import {MarkdownModule, MarkedOptions} from 'ngx-markdown';
import {SessionControlPanelComponent} from './session-control-panel/session-control-panel.component';
import {ButtonsModule} from '../buttons/buttons.module';
import {NewContainerCreatorComponent} from './new-container-creator/new-container-creator.component';
import {HeadersModule} from '../headers/headers.module';
import {NewCardCreatorComponent} from './new-card-creator/new-card-creator.component';
import {PillModule} from '../pill/pill.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {DragDirective} from './drag.directive';
import {DropDirective} from './drop.directive';
import {MergeCardsComponent} from './merge-cards/merge-cards.component';
import {UnlockSessionComponent} from './unlock-session/unlock-session.component';
import {ExportModule} from '../export/export.module';
import {DarkModeModule} from '../dark-mode/dark-mode.module';
import { ContainerHandleComponent } from './container-handle/container-handle.component';
import { CreateCardButtonComponent } from './create-card-button/create-card-button.component';
import {ShortcutLabelModule} from '../shortcut-label/shortcut-label.module';

@NgModule({
  declarations: [
    SessionComponent,
    CardContainerComponent,
    CardComponent,
    SessionControlPanelComponent,
    NewContainerCreatorComponent,
    NewCardCreatorComponent,
    DragDirective,
    DropDirective,
    MergeCardsComponent,
    UnlockSessionComponent,
    ContainerHandleComponent,
    CreateCardButtonComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: SessionComponent},
      {path: 'new-container', component: NewContainerCreatorComponent},
      {path: 'new-card', component: NewCardCreatorComponent},
      {path: 'merge-cards/:id1/:id2', component: MergeCardsComponent},
      {path: 'unlock', component: UnlockSessionComponent}
    ]),
    MarkdownModule.forRoot(),
    ButtonsModule,
    HeadersModule,
    PillModule,
    DragDropModule,
    ExportModule,
    DarkModeModule,
    ShortcutLabelModule
  ]
})
export class SessionModule {
}
