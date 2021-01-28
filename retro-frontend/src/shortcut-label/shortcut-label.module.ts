import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortcutLabelComponent } from './shortcut-label/shortcut-label.component';
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
    declarations: [ShortcutLabelComponent],
    exports: [
        ShortcutLabelComponent
    ],
    imports: [
        CommonModule,
        TranslateModule
    ]
})
export class ShortcutLabelModule { }
