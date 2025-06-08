import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerViewShellComponent } from './customer-view-shell.component';

describe('CustomerViewShellComponent', () => {
  let component: CustomerViewShellComponent;
  let fixture: ComponentFixture<CustomerViewShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerViewShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerViewShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
