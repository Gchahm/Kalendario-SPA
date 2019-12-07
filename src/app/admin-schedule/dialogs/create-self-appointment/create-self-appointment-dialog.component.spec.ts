import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSelfAppointmentDialogComponent } from './create-self-appointment-dialog.component';

describe('CreateSelfAppointmentDialogComponent', () => {
  let component: CreateSelfAppointmentDialogComponent;
  let fixture: ComponentFixture<CreateSelfAppointmentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSelfAppointmentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSelfAppointmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
