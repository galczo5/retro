import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserIdService } from './user-id.service';

@Injectable()
export class UserIdHttpInterceptor implements HttpInterceptor {

  constructor(private readonly userIdServiceService: UserIdService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const httpRequest = req.clone({
      headers: req.headers.set('User-Id', this.userIdServiceService.getUserId())
    });

    return next.handle(httpRequest);
  }

}
