import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentHistoryDetailsComponent } from './appointment-history-details.component';

describe('AppointmentHistoryDetailsComponent', () => {
  let component: AppointmentHistoryDetailsComponent;
  let fixture: ComponentFixture<AppointmentHistoryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentHistoryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentHistoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
