import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfAppointmentFormComponent } from './self-appointment-form.component';

describe('SelfAppointmentFormComponent', () => {
  let component: SelfAppointmentFormComponent;
  let fixture: ComponentFixture<SelfAppointmentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfAppointmentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfAppointmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
