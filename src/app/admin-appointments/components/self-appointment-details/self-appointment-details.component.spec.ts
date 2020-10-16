import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SelfAppointmentDetailsComponent} from './self-appointment-details.component';
import {Appointment} from '@api/models';

describe('SelfAppointmentDetailsComponent', () => {
  let component: SelfAppointmentDetailsComponent;
  let fixture: ComponentFixture<SelfAppointmentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelfAppointmentDetailsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfAppointmentDetailsComponent);
    component = fixture.componentInstance;
    component.model = new Appointment();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
