import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../../admin-schedule/services/auth.service';
import {environment} from '../../../environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private baseUrl = environment.apiUrl;

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (AuthService.isLoggedIn() && req.url.includes(this.baseUrl)) {
      req = req.clone({
        setHeaders: {
          Authorization: `Token ${AuthService.getToken()}`
        }
      });
    }
    return next.handle(req);
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true
};
