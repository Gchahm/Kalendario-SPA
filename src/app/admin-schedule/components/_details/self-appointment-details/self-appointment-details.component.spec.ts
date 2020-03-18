import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfAppointmentDetailsComponent } from './self-appointment-details.component';

describe('SelfAppointmentDetailsComponent', () => {
  let component: SelfAppointmentDetailsComponent;
  let fixture: ComponentFixture<SelfAppointmentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfAppointmentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfAppointmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
