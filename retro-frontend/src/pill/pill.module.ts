import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PillComponent } from './pill.component';



@NgModule({
  declarations: [PillComponent],
  exports: [PillComponent],
  imports: [
    CommonModule
  ]
})
export class PillModule { }
