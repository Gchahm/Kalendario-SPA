import { TestBed } from '@angular/core/testing';

import { CanViewUsersGuard } from './can-view-users.guard';

describe('CanViewUsersGuard', () => {
  let guard: CanViewUsersGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanViewUsersGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
