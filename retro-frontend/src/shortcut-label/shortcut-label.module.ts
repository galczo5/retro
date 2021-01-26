import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortcutLabelComponent } from './shortcut-label/shortcut-label.component';



@NgModule({
    declarations: [ShortcutLabelComponent],
    exports: [
        ShortcutLabelComponent
    ],
    imports: [
        CommonModule
    ]
})
export class ShortcutLabelModule { }
