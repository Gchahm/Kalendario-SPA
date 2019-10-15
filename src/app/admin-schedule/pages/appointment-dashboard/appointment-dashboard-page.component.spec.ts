import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentDashboardPageComponent } from './appointment-dashboard-page.component';

describe('AppointmentDashboardPageComponent', () => {
  let component: AppointmentDashboardPageComponent;
  let fixture: ComponentFixture<AppointmentDashboardPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentDashboardPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
