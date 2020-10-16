import {inject, TestBed} from '@angular/core/testing';
import {CanViewCustomersGuard} from './can-view-customers.guard';
import {AuthService} from '@shared/services/auth.service';
import {AuthServiceMock} from '@shared/test/stubs';
import {User} from '@api/models';
import {of} from 'rxjs';

describe('CanViewCustomersGuard', () => {
  let guard: CanViewCustomersGuard;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: AuthService, useClass: AuthServiceMock},
        CanViewCustomersGuard
      ]
    });
    guard = TestBed.inject(CanViewCustomersGuard);
    authService = TestBed.inject(AuthService);
  });

  it('should ...', inject([CanViewCustomersGuard], (guard: CanViewCustomersGuard) => {
    expect(guard).toBeTruthy();
  }));

  describe('canActivate', () => {
    it('should return false if the user is anonymous', async () => {
      let result;

      await guard.canActivate(null, null)
        .toPromise()
        .then(res => {
          result = res;
        });

      expect(result).toBeFalsy();
    });

    it('should return true if the user has view_customer permission', async () => {
      let result;

      spyOn(authService, 'whoAmI').and.callFake(() => {
        const user = new User();
        user.permissions.push('scheduling.view_customer');
        return of(user);
      });

      await guard.canActivate(null, null)
        .toPromise()
        .then(res => {
          result = res;
        });

      expect(result).toBeTruthy();
    });
  });
});
