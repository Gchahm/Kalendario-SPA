import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSelfAppointmentComponent } from './form-self-appointment.component';

describe('FormSelfAppointmentComponent', () => {
  let component: FormSelfAppointmentComponent;
  let fixture: ComponentFixture<FormSelfAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSelfAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSelfAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
