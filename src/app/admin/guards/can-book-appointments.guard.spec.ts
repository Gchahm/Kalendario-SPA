import { TestBed } from '@angular/core/testing';

import { CanBookAppointmentsGuard } from './can-book-appointments.guard';

describe('CanBookAppointmentsGuard', () => {
  let guard: CanBookAppointmentsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanBookAppointmentsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
