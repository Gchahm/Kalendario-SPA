import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAppointmentDialogComponent } from './create-appointment-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';

describe('CreateAppointmentDialogComponent', () => {
  let component: CreateAppointmentDialogComponent;
  let fixture: ComponentFixture<CreateAppointmentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [ CreateAppointmentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAppointmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
