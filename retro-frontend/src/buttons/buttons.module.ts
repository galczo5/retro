import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonComponent} from './button.component';
import { SaveLabelComponent } from './save-label/save-label.component';


@NgModule({
    declarations: [ButtonComponent, SaveLabelComponent, SaveLabelComponent],
  imports: [CommonModule],
    exports: [ButtonComponent, SaveLabelComponent]
})
export class ButtonsModule {
}
