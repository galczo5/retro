import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectLanguageComponent } from './select-language/select-language.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [SelectLanguageComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [SelectLanguageComponent]
})
export class LanguageModule { }
