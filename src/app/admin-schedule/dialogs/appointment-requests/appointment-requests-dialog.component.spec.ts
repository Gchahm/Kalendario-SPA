import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentRequestsDialogComponent } from './appointment-requests-dialog.component';

describe('AppointmentRequestsDialogComponent', () => {
  let component: AppointmentRequestsDialogComponent;
  let fixture: ComponentFixture<AppointmentRequestsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentRequestsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentRequestsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
