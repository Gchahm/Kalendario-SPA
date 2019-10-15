import { TestBed, async, inject } from '@angular/core/testing';

import { CanViewServicesGuard } from './can-view-services.guard';

describe('CanViewServicesGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanViewServicesGuard]
    });
  });

  it('should ...', inject([CanViewServicesGuard], (guard: CanViewServicesGuard) => {
    expect(guard).toBeTruthy();
  }));
});
