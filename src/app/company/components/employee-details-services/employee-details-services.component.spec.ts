import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDetailsServicesComponent } from './employee-details-services.component';

describe('EmployeeServicesComponent', () => {
  let component: EmployeeDetailsServicesComponent;
  let fixture: ComponentFixture<EmployeeDetailsServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDetailsServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDetailsServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
