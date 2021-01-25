import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DarkModeComponent } from './dark-mode/dark-mode.component';
import {ButtonsModule} from '../buttons/buttons.module';



@NgModule({
    declarations: [DarkModeComponent],
    exports: [
        DarkModeComponent
    ],
  imports: [
    CommonModule,
    ButtonsModule
  ]
})
export class DarkModeModule { }
