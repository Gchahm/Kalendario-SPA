import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentEventDialogComponent } from './appointment-event-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatDialogRefMock} from '@shared/test/stubs';
import {Appointment} from '@core/models/Appointment';
import {Service} from '@core/models/Service';

describe('AppointmentEventDialogComponent', () => {
  let component: AppointmentEventDialogComponent;
  let fixture: ComponentFixture<AppointmentEventDialogComponent>;
  const data = {appointment: new Appointment(), service: new Service()};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentEventDialogComponent],
      providers: [
        { provide: MatDialogRef, useClass: MatDialogRefMock },
        {provide: MAT_DIALOG_DATA, useValue: data},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentEventDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
