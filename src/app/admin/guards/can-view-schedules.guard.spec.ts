import {inject, TestBed} from '@angular/core/testing';

import {CanViewSchedulesGuard} from './can-view-schedules.guard';
import {AuthService} from '@shared/services/auth.service';
import {AuthServiceMock} from '@shared/test/stubs';
import {IUser} from '@api/models';
import {of} from 'rxjs';

describe('CanViewSchedulesGuard', () => {
  let guard: CanViewSchedulesGuard;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: AuthService, useClass: AuthServiceMock},
        CanViewSchedulesGuard
      ]
    });
    guard = TestBed.inject(CanViewSchedulesGuard);
    authService = TestBed.inject(AuthService);
  });

  it('should ...', inject([CanViewSchedulesGuard], (guard: CanViewSchedulesGuard) => {
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

    it('should return true if the user has view_schedule permission', async () => {
      let result;

      spyOn(authService, 'whoAmI').and.callFake(() => {
        const user = new IUser();
        user.permissions.push('scheduling.view_schedule');
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
