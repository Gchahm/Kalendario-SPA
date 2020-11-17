import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAppointmentsShellComponent } from './customer-appointments-shell.component';

describe('CustomerAppointmentsComponent', () => {
  let component: CustomerAppointmentsShellComponent;
  let fixture: ComponentFixture<CustomerAppointmentsShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerAppointmentsShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAppointmentsShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
