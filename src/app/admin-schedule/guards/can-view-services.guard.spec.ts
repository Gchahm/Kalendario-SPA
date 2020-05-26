import { TestBed} from '@angular/core/testing';
import { CanViewServicesGuard } from './can-view-services.guard';
import {AuthService} from '@shared/services/auth.service';
import {AuthServiceMock} from '@shared/test/stubs';
import {User} from '@core/models/User';
import {of} from 'rxjs';

describe('CanViewServicesGuard', () => {
  let guard: CanViewServicesGuard;
  let authService: AuthService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        {provide: AuthService, useClass: AuthServiceMock},
        CanViewServicesGuard
      ]
    });
    guard = TestBed.inject(CanViewServicesGuard);
    authService = TestBed.inject(AuthService);
  });

  it('should create', () => {
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

    it('should return true if the user has view_service permission', async () => {
      let result;

      spyOn(authService, 'whoAmI').and.callFake(() => {
        const user = new User();
        user.permissions.push('scheduling.view_service');
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
