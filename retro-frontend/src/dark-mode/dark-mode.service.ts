import {Inject, Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {LocalStorageService} from '../util/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  private renderer: Renderer2;
  private readonly LS_DARK_MODE_KEY: string = 'dark-mode';

  constructor(
    private readonly rendererFactory: RendererFactory2,
    private readonly localStorageService: LocalStorageService,
    @Inject(DOCUMENT) private readonly document: Document
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  get(): boolean {
    return this.localStorageService.getValue<boolean>(this.LS_DARK_MODE_KEY);
  }

  set(dark: boolean): void {
    this.localStorageService.setValue(this.LS_DARK_MODE_KEY, dark);
    if (dark) {
      this.renderer.addClass(this.document.getElementsByTagName('html')[0], 'dark');
    } else {
      this.renderer.removeClass(this.document.getElementsByTagName('html')[0], 'dark');
    }
  }
}
