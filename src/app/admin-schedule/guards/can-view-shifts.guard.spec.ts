import { TestBed, async, inject } from '@angular/core/testing';

import { CanViewShiftsGuard } from './can-view-shifts-guard.service';

describe('CanViewShiftsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanViewShiftsGuard]
    });
  });

  it('should ...', inject([CanViewShiftsGuard], (guard: CanViewShiftsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
