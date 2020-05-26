import { TestBed, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import {AuthService} from '@shared/services/auth.service';
import {AuthServiceMock, RouterMock, ToastServiceMock} from '@shared/test/stubs';
import {Router} from '@angular/router';
import {ToastService} from '@shared/services/toast.service';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {provide: AuthService, useClass: AuthServiceMock},
        {provide: Router, useClass: RouterMock},
        {provide: ToastService, useClass: ToastServiceMock}
      ]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
