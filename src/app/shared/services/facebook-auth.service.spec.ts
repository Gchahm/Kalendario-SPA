import { TestBed } from '@angular/core/testing';

import { FacebookAuthService } from './facebook-auth.service';

describe('FacebookAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FacebookAuthService = TestBed.inject(FacebookAuthService);
    expect(service).toBeTruthy();
  });
});
