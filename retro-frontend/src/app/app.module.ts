import {BrowserModule} from '@angular/platform-browser';
import {APP_BOOTSTRAP_LISTENER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrandModule} from '../brand/brand.module';
import {UserIdService} from './user-id.service';
import {UserIdInterceptor} from './user-id-interceptor.service';
import {DragDropModule} from '@angular/cdk/drag-drop';

export function userIdProvideFactory(userIdServiceService: UserIdService): () => void {
  return () => {
    userIdServiceService.getUserId();
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
    BrandModule
  ],
  providers: [
    {
      provide: APP_BOOTSTRAP_LISTENER,
      useFactory: userIdProvideFactory,
      deps: [UserIdService],
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
