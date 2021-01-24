import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {RouterModule} from '@angular/router';
import {BrandModule} from '../brand/brand.module';
import {NewSessionCreatorComponent} from './new-session-creator/new-session-creator.component';
import {ButtonsModule} from '../buttons/buttons.module';
import {HeadersModule} from '../headers/headers.module';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    HomeComponent,
    NewSessionCreatorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: HomeComponent},
      {path: 'new-session', component: NewSessionCreatorComponent}
    ]),
    BrandModule,
    ButtonsModule,
    HeadersModule
  ]
})
export class HomeModule {
}
