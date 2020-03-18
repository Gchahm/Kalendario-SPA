import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentEventDialogComponent } from './appointment-event-dialog.component';

describe('AppointmentEventDialogComponent', () => {
  let component: AppointmentEventDialogComponent;
  let fixture: ComponentFixture<AppointmentEventDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentEventDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentEventDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
