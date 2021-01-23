import { NgModule, SecurityContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionComponent } from './session/session.component';
import { RouterModule } from '@angular/router';
import { CardContainerComponent } from './card-container/card-container.component';
import { CardComponent } from './card/card.component';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { SessionControlPanelComponent } from './session-control-panel/session-control-panel.component';
import { ButtonsModule } from '../buttons/buttons.module';
import { NewContainerCreatorComponent } from './new-container-creator/new-container-creator.component';
import { HeadersModule } from '../headers/headers.module';

@NgModule({
  declarations: [SessionComponent, CardContainerComponent, CardComponent, SessionControlPanelComponent, NewContainerCreatorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: SessionComponent },
      { path: 'new-container', component: NewContainerCreatorComponent }
    ]),
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          breaks: true,
          pedantic: true,
          smartLists: true,
          smartypants: true
        }
      }
    }),
    ButtonsModule,
    HeadersModule
  ]
})
export class SessionModule { }
