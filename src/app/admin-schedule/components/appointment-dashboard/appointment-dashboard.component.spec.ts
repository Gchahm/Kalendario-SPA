import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentDashboardComponent } from './appointment-dashboard.component';
import {NgReduxTestingModule} from '@angular-redux/store/testing';
import {MatMenuModule} from '@angular/material/menu';

describe('AppointmentDashboardComponent', () => {
  let component: AppointmentDashboardComponent;
  let fixture: ComponentFixture<AppointmentDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgReduxTestingModule,
        MatMenuModule,
      ],
      declarations: [ AppointmentDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
