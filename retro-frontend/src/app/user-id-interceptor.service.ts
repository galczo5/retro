import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserIdService } from './user-id.service';
import { EditorRoleService } from './editor-role.service';

@Injectable()
export class UserIdInterceptor implements HttpInterceptor {

  constructor(private readonly userIdServiceService: UserIdService,
              private readonly editorRoleService: EditorRoleService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userId = this.userIdServiceService.getUserId();
    const token = this.editorRoleService.getToken();

    let httpRequest = req.clone({
      headers: req.headers.set('User-Id', userId)
    });

    if (token) {
      httpRequest = httpRequest.clone({
        headers: req.headers.set('User-Token', token)
      })
    }

    return next.handle(httpRequest);
  }

}
