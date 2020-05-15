import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentRequestsDialogComponent } from './appointment-requests-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';

describe('AppointmentRequestsDialogComponent', () => {
  let component: AppointmentRequestsDialogComponent;
  let fixture: ComponentFixture<AppointmentRequestsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [ AppointmentRequestsDialogComponent ]
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
