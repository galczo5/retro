import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExportButtonComponent} from './export-button/export-button.component';
import {ButtonsModule} from '../buttons/buttons.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [ExportButtonComponent],
  exports: [
    ExportButtonComponent
  ],
  imports: [
    CommonModule,
    ButtonsModule,
    TranslateModule
  ]
})
export class ExportModule {
}
