import {BrowserModule} from '@angular/platform-browser';
import {APP_BOOTSTRAP_LISTENER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {BrandModule} from '../brand/brand.module';
import {UserIdService} from './user-id.service';
import {UserIdInterceptor} from './user-id-interceptor.service';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {DarkModeService} from '../dark-mode/dark-mode.service';
import {LanguageService} from "../language/language.service";

export function userIdProvideFactory(userIdServiceService: UserIdService): () => void {
  return () => {
    userIdServiceService.getUserId();
  };
}

export function darkModeInitializer(darkModeService: DarkModeService): () => void {
  return () => {
    darkModeService.set(darkModeService.get());
  };
}

export function languageInitializer(languageService: LanguageService): () => void {
  return () => {
    languageService.set(languageService.get());
  };
}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DragDropModule,
    HttpClientModule,
    AppRoutingModule,
    BrandModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'en'
    })
  ],
  providers: [
    {
      provide: APP_BOOTSTRAP_LISTENER,
      useFactory: userIdProvideFactory,
      deps: [UserIdService],
      multi: true
    },
    {
      provide: APP_BOOTSTRAP_LISTENER,
      useFactory: darkModeInitializer,
      deps: [DarkModeService],
      multi: true
    },
    {
      provide: APP_BOOTSTRAP_LISTENER,
      useFactory: languageInitializer,
      deps: [LanguageService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserIdInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
