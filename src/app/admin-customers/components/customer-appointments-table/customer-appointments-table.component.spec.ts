import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAppointmentsTableComponent } from './customer-appointments-table.component';

describe('CustomerAppointmentsTableComponent', () => {
  let component: CustomerAppointmentsTableComponent;
  let fixture: ComponentFixture<CustomerAppointmentsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerAppointmentsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAppointmentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
