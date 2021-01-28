import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonComponent} from './button.component';
import { SaveLabelComponent } from './save-label/save-label.component';
import { ShareButtonComponent } from './share-button/share-button.component';


@NgModule({
    declarations: [ButtonComponent, SaveLabelComponent, SaveLabelComponent, ShareButtonComponent],
  imports: [CommonModule],
    exports: [ButtonComponent, SaveLabelComponent, ShareButtonComponent]
})
export class ButtonsModule {
}
