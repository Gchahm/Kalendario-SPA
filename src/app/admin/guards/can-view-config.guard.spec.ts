import { TestBed } from '@angular/core/testing';

import { CanViewConfigGuard } from './can-view-config.guard';

describe('CanViewConfigGuard', () => {
  let guard: CanViewConfigGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanViewConfigGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
