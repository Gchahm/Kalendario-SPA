import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '@api/clients/auth.service';
import {throwError, BehaviorSubject} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  private refreshTokenInProgress = false;
  // Refresh Token Subject tracks the current token, or is null if no token is currently
  // available (e.g. refresh pending).
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(public auth: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(error => {
        // We don't want to refresh token for some requests like login or refresh token itself
        // So we verify url and we throw an error if it's the case
        if (request.url.includes('token/refresh/') || request.url.includes('login')) {
          // We do another check to see if refresh token failed
          // In this case we want to logout user and to redirect it to login page
          if (request.url.includes('token/refresh/')) {
            this.auth.logout();
          }

          return throwError(error);
        }

        // If error status is different than 401 we want to skip refresh token
        // So we check that and throw the error if it's the case
        if (error.status !== 401) {
          return throwError(error);
        }

        if (this.refreshTokenInProgress) {
          // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value
          // – which means the new token is ready and we can retry the request again
          return this.refreshTokenSubject.pipe(
            filter(result => result !== null),
            take(1),
            switchMap(() => next.handle(this.addAuthenticationToken(request)))
          );
        }
        this.refreshTokenInProgress = true;

        // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
        this.refreshTokenSubject.next(null);

        // Call auth.refreshAccessToken(this is an Observable that will be returned)
        return this.auth.refreshAccessToken().pipe(
          // When the call to refreshToken completes we reset the refreshTokenInProgress to false
          // for the next time the token needs to be refreshed
          tap(token => this.refreshTokenInProgress = false),
          tap(token => this.refreshTokenSubject.next(token)),
          switchMap((token: string) => next.handle(this.addAuthenticationToken(request))),
          catchError((err: any) => {
            this.refreshTokenInProgress = false;
            this.auth.logout();
            return throwError(error);
          })
        );
      })
    );
  }

  addAuthenticationToken(request): HttpRequest<any> {
    // Get access token from Local Storage
    const accessToken = AuthService.getToken();

    // If access token is null this means that user is not logged in
    // And we return the original request
    if (!accessToken) {
      return request;
    }

    // We clone the request, because the original request is immutable
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${AuthService.getToken()}`
      }
    });
  }
}

export const RefreshTokenInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: RefreshTokenInterceptor,
  multi: true
};
