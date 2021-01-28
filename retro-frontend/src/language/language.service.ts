import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LocalStorageService} from '../util/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private readonly LS_LANGUAGE_KEY: string = 'language';

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly translateService: TranslateService
  ) {
  }

  get(): string {
    return this.localStorageService.getValue<string>(this.LS_LANGUAGE_KEY);
  }

  set(language: string): void {
    this.localStorageService.setValue(this.LS_LANGUAGE_KEY, language);
    this.translateService.use(language);
  }
}
