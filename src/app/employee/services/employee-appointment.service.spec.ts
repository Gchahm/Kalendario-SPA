import { TestBed } from '@angular/core/testing';

import { EmployeeAppointmentService } from './employee-appointment.service';

describe('EmployeeAppointmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeAppointmentService = TestBed.get(EmployeeAppointmentService);
    expect(service).toBeTruthy();
  });
});
