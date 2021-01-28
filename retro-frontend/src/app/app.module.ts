import {BrowserModule} from '@angular/platform-browser';
import {APP_BOOTSTRAP_LISTENER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrandModule} from '../brand/brand.module';
import {UserIdService} from './user-id.service';
import {UserIdInterceptor} from './user-id-interceptor.service';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {DarkModeService} from '../dark-mode/dark-mode.service';
import {DarkModeModule} from '../dark-mode/dark-mode.module';
import {ButtonsModule} from '../buttons/buttons.module';

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
    DarkModeModule,
    ButtonsModule
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
      provide: HTTP_INTERCEPTORS,
      useClass: UserIdInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
