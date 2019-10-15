import { TestBed, async, inject } from '@angular/core/testing';

import { CanBookAppointments } from './can-book-appointments.service';

describe('CanBookAppointments', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanBookAppointments]
    });
  });

  it('should ...', inject([CanBookAppointments], (guard: CanBookAppointments) => {
    expect(guard).toBeTruthy();
  }));
});
