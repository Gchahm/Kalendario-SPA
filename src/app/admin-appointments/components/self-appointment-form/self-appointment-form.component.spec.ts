import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SelfAppointmentFormComponent} from './self-appointment-form.component';
import {FormBuilder} from '@angular/forms';
import {ModelViewSetClientMock} from '@api/testing';
import {AppointmentAdminClient} from '@api/clients';
import {Appointment, IAppointment} from '@api/models';

describe('SelfAppointmentFormComponent', () => {
  let component: SelfAppointmentFormComponent;
  let fixture: ComponentFixture<SelfAppointmentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelfAppointmentFormComponent],
      providers: [
        {provide: AppointmentAdminClient, useClass: ModelViewSetClientMock},
        FormBuilder
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfAppointmentFormComponent);
    component = fixture.componentInstance;
    component.model = Appointment.fromJS();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
