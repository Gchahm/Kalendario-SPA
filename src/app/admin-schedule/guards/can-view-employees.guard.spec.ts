import { TestBed, inject } from '@angular/core/testing';

import { CanViewEmployeesGuard } from './can-view-employees.guard';
import {AuthService} from '@shared/services/auth.service';
import {AuthServiceMock} from '@shared/test/stubs';
import {User} from '@core/models/User';
import {of} from 'rxjs';

describe('CanViewEmployeesGuard', () => {
  let guard: CanViewEmployeesGuard;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: AuthService, useClass: AuthServiceMock},
        CanViewEmployeesGuard
      ]
    });
    guard = TestBed.inject(CanViewEmployeesGuard);
    authService = TestBed.inject(AuthService);
  });

  it('should ...', inject([CanViewEmployeesGuard], (guard: CanViewEmployeesGuard) => {
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

    it('should return true if the user has view_employee permission', async () => {
      let result;

      spyOn(authService, 'whoAmI').and.callFake(() => {
        const user = new User();
        user.permissions.push('scheduling.view_employee');
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
