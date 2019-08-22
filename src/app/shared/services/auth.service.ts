import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginModel} from '../../staff-services/models/LoginModel';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {UserService} from './user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Customer} from '../models/Customer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiUrl + 'auth/';

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router) {
  }

  login(user: LoginModel): Observable<any> {
    return this.http.post(this.baseUrl + 'login/', user).pipe(map(this.log));
  }

  logout() {
    return this.http.post<{ detail: string }>(this.baseUrl + 'logout/', {}).pipe(
      map(res => {
        localStorage.removeItem('token');
        this.router.navigate(['']);
        return res;
      })
    );
  }

  register(form: any) {
    return this.http.post(this.baseUrl + 'registration/', form).pipe(map(this.log));
  }

  private log = (project: any) => {
    this.setToken(project.key);
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    this.router.navigate([returnUrl]);
  };

  isLoggedIn() {
    return !!this.getToken();
  }

  private setToken(token: string) {
    localStorage.setItem('token', token);
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

}
