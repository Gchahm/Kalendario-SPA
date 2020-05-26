import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfAppointmentFormComponent } from './self-appointment-form.component';
import {AppointmentService} from '@shared/services/appointment.service';
import {DjangoRWModelServiceMock} from '@core/test/stubs';
import {Appointment} from '@core/models/Appointment';
import {FormBuilder} from '@angular/forms';

describe('SelfAppointmentFormComponent', () => {
  let component: SelfAppointmentFormComponent;
  let fixture: ComponentFixture<SelfAppointmentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfAppointmentFormComponent ],
      providers: [
        {provide: AppointmentService, useClass: DjangoRWModelServiceMock},
        FormBuilder
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfAppointmentFormComponent);
    component = fixture.componentInstance;
    component.model = new Appointment();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
