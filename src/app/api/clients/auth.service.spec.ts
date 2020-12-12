import {TestBed} from '@angular/core/testing';
import {AuthService} from './auth.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {MockNgRedux, NgReduxTestingModule} from '@angular-redux/store/testing';
import {MatSnackBar} from '@angular/material/snack-bar';
import {environment} from '../../../environments/environment';
import {AUTH_LOGIN_RESPONSE, AUTH_WHO_AM_I_RESPONSE} from '../../../tests/server/responses';
import {of} from 'rxjs';
import {LoginModel} from '@api/models/LoginModel';
import {User, UserAdapter} from '@api/models';

describe('AuthService', () => {
  const matSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
  let authService: AuthService;
  let http: HttpTestingController;
  let redux;

  const baseUrl = environment.apiUrl + 'auth/';
  const whoAmIResponse = (new UserAdapter()).adapt(AUTH_WHO_AM_I_RESPONSE);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgReduxTestingModule
      ],
      providers: [
        AuthService,
        UserAdapter,
        MockNgRedux,
        {provide: MatSnackBar, useValue: matSnackBar}
      ]
    });
    redux = MockNgRedux.getInstance();
    authService = TestBed.inject(AuthService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    AuthService.removeToken();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('login', () => {
    it('should log the token in localStorage with a valid login', () => {
      const model: LoginModel = {email: 'e@email.com', password: 'pass'};
      let response;

      expect(AuthService.isLoggedIn()).not.toBeTruthy();

      authService.login(model).subscribe(res => {
        response = res;
      });
      spyOn(authService, 'whoAmI').and.callFake(() => of(whoAmIResponse));

      http.expectOne(baseUrl + 'login/').flush(AUTH_LOGIN_RESPONSE);

      expect(localStorage.getItem('token')).toEqual(AUTH_LOGIN_RESPONSE.key);
      expect(AuthService.isLoggedIn()).toBeTruthy();
      expect(response).toBe(whoAmIResponse);
    });
  });

  describe('whoAmI', () => {
    it('should return a user if logged in', () => {
      let response;

      AuthService.setToken('token');

      authService.whoAmI().subscribe(res => {
        response = res;
      });
      spyOn(redux, 'dispatch').and.callFake(({type, user}) => {
        expect(type).toBe(LOGIN_USER);
        expect(user).toEqual(whoAmIResponse);
      });

      http.expectOne(baseUrl + 'current/').flush(AUTH_WHO_AM_I_RESPONSE);
      expect(response).toEqual(whoAmIResponse);
      http.verify();
    });

    it('should return an anonymous user if not logged in', async () => {
      let response;

      await authService.whoAmI()
        .toPromise()
        .then(res => {
          response = res;
        });

      expect(response).toBe(User.AnonymousUser());
    });
  });
});
