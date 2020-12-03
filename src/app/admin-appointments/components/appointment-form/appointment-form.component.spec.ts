import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AppointmentFormComponent} from './appointment-form.component';
import {FormBuilder} from '@angular/forms';
import {ModelViewSetClientMock} from '@api/testing';
import {AppointmentAdminClient} from '@api/clients';
import {Appointment, IAppointment} from '@api/models';

describe('AppointmentFormComponent', () => {
  let component: AppointmentFormComponent;
  let fixture: ComponentFixture<AppointmentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentFormComponent],
      providers: [
        FormBuilder,
        {provide: AppointmentAdminClient, useClass: ModelViewSetClientMock}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentFormComponent);
    component = fixture.componentInstance;
    component.model = Appointment.fromJS();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
