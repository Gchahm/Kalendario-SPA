// import {Injectable} from '@angular/core';
// import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
// import {Observable} from 'rxjs';
// import {environment} from '../../../environments/environment';
// import {IAppState} from '../../Store';
// import {NgRedux} from '@angular-redux/store';
//
// @Injectable()
// export class OwnerInterceptor implements HttpInterceptor {
//
//   private baseUrl = environment.apiUrl + 'admin/';
//
//   constructor(private store: NgRedux<IAppState>) {
//   }
//
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     if (req.url.startsWith(this.baseUrl) && ['POST', 'PATCH'].includes(req.method)
//       && req.headers['content-type'] !== 'application/x-www-form-urlencoded') {
//       console.log(req);
//       const companyId = this.store.getState().core.user.company.id;
//       // req = req.clone({
//       //   body: Object.assign({}, req.body, {owner: companyId})
//       // });
//     }
//     return next.handle(req);
//   }
// }
//
// export const OwnerInterceptorProvider = {
//   provide: HTTP_INTERCEPTORS,
//   useClass: OwnerInterceptor,
//   multi: true
// };
