import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRwComponent } from './customer-rw.component';

describe('CustomerRwComponent', () => {
  let component: CustomerRwComponent;
  let fixture: ComponentFixture<CustomerRwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerRwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerRwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
