import { TestBed, async, inject } from '@angular/core/testing';

import { CanViewEmployeesGuard } from './can-view-employees.guard';

describe('CanViewEmployeesGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanViewEmployeesGuard]
    });
  });

  it('should ...', inject([CanViewEmployeesGuard], (guard: CanViewEmployeesGuard) => {
    expect(guard).toBeTruthy();
  }));
});
