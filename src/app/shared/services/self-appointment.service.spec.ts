import { TestBed } from '@angular/core/testing';

import { SelfAppointmentService } from './self-appointment.service';

describe('SelfAppointmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelfAppointmentService = TestBed.get(SelfAppointmentService);
    expect(service).toBeTruthy();
  });
});
