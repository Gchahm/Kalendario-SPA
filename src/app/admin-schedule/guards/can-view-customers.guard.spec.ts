import { TestBed, async, inject } from '@angular/core/testing';

import { CanViewCustomersGuard } from './can-view-customers.guard';

describe('CanViewCustomersGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanViewCustomersGuard]
    });
  });

  it('should ...', inject([CanViewCustomersGuard], (guard: CanViewCustomersGuard) => {
    expect(guard).toBeTruthy();
  }));
});
