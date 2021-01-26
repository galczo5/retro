import {Inject, Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  private renderer: Renderer2;

  constructor(private readonly rendererFactory: RendererFactory2,
              @Inject(DOCUMENT) private readonly document: Document) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  get(): boolean {
    return !!localStorage.getItem('dark-mode');
  }

  set(dark: boolean): void {
    localStorage.setItem('dark-mode', dark ? 'true' : '');
    if (dark) {
      this.renderer.addClass(this.document.getElementsByTagName('html')[0], 'dark');
    } else {
      this.renderer.removeClass(this.document.getElementsByTagName('html')[0], 'dark');
    }
  }
}
