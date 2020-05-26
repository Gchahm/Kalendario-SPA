import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentRequestsDialogComponent } from './appointment-requests-dialog.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatDialogRefMock, MatSnackBarMock} from '@shared/test/stubs';
import {ToastService} from '@shared/services/toast.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AppointmentService} from '@shared/services/appointment.service';
import {AdminServiceMock} from '../../../test/stubs';

describe('AppointmentRequestsDialogComponent', () => {
  let component: AppointmentRequestsDialogComponent;
  let fixture: ComponentFixture<AppointmentRequestsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [ AppointmentRequestsDialogComponent ],
      providers: [
        { provide: MatDialogRef, useClass: MatDialogRefMock },
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatSnackBar, useClass: MatSnackBarMock},
        {provide: AppointmentService, useClass: AdminServiceMock},
        ToastService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentRequestsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
