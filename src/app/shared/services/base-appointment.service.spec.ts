import { TestBed } from '@angular/core/testing';

import { BaseAppointmentService } from './base-appointment.service';

describe('BaseAppointmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BaseAppointmentService = TestBed.get(BaseAppointmentService);
    expect(service).toBeTruthy();
  });
});
