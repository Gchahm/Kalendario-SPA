import { TestBed, async, inject } from '@angular/core/testing';

import { CanViewSchedulesGuard } from './can-view-schedules.guard';

describe('CanViewSchedulesGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanViewSchedulesGuard]
    });
  });

  it('should ...', inject([CanViewSchedulesGuard], (guard: CanViewSchedulesGuard) => {
    expect(guard).toBeTruthy();
  }));
});
