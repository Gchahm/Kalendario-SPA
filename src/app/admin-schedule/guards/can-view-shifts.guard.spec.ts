import {TestBed} from '@angular/core/testing';

import {CanViewShiftsGuard} from './can-view-shifts-guard.service';
import {AuthService} from '@shared/services/auth.service';
import {AuthServiceMock} from '@shared/test/stubs';
import {User} from '@core/models/User';
import {of} from 'rxjs';

describe('CanViewShiftsGuard', () => {
  let guard: CanViewShiftsGuard;
  let authService: AuthService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        {provide: AuthService, useClass: AuthServiceMock},
        CanViewShiftsGuard
      ]
    });
    guard = TestBed.inject(CanViewShiftsGuard);
    authService = TestBed.inject(AuthService);
  });

  it('should return true if user has read_shift', () => {
    expect(guard).toBeTruthy();
  });

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

    it('should return true if the user has view_shift permission', async () => {
      let result;

      spyOn(authService, 'whoAmI').and.callFake(() => {
        const user = new User();
        user.permissions.push('scheduling.view_shift');
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
