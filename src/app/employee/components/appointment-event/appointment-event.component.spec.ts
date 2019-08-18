import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentEventComponent } from './appointment-event.component';

describe('AppointmentEventComponent', () => {
  let component: AppointmentEventComponent;
  let fixture: ComponentFixture<AppointmentEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
