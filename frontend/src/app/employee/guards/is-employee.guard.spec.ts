import { TestBed } from '@angular/core/testing';

import { IsEmployeeGuard } from './is-employee.guard';

describe('IsEmployeeGuard', () => {
  let guard: IsEmployeeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsEmployeeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
