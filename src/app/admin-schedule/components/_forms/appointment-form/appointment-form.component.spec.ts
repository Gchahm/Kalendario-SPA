import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentFormComponent } from './appointment-form.component';
import {FormBuilder} from '@angular/forms';
import {AppointmentService} from '@shared/services/appointment.service';
import {DjangoRWModelServiceMock} from '@core/test/stubs';
import {Appointment} from '@core/models/Appointment';

describe('AppointmentFormComponent', () => {
  let component: AppointmentFormComponent;
  let fixture: ComponentFixture<AppointmentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentFormComponent ],
      providers: [
        FormBuilder,
        {provide: AppointmentService, useClass: DjangoRWModelServiceMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentFormComponent);
    component = fixture.componentInstance;
    component.model = new Appointment();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
