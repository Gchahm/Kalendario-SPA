import { TestBed } from '@angular/core/testing';

import { CanViewUserGroupsGuard } from './can-view-user-groups.guard';

describe('CanViewUserGroupsGuard', () => {
  let guard: CanViewUserGroupsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanViewUserGroupsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
