import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExportButtonComponent} from './export-button/export-button.component';
import {ButtonsModule} from '../buttons/buttons.module';

@NgModule({
  declarations: [ExportButtonComponent],
  exports: [
    ExportButtonComponent
  ],
  imports: [
    CommonModule,
    ButtonsModule
  ]
})
export class ExportModule {
}
