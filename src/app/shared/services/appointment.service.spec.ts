import { TestBed } from '@angular/core/testing';

import { AppointmentService } from './appointment.service';
import {AppointmentAdapter} from '@core/models/Appointment';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AppointmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ],
    providers: [
      AppointmentAdapter
    ]
  }));

  it('should be created', () => {
    const service: AppointmentService = TestBed.inject(AppointmentService);
    expect(service).toBeTruthy();
  });
});
