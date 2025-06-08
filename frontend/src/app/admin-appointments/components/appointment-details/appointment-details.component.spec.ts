import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AppointmentDetailsComponent} from './appointment-details.component';
import {Appointment, IAppointment} from '@api/models';

describe('AppointmentDetailsComponent', () => {
  let component: AppointmentDetailsComponent;
  let fixture: ComponentFixture<AppointmentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentDetailsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentDetailsComponent);
    component = fixture.componentInstance;
    component.model = Appointment.fromJS();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
