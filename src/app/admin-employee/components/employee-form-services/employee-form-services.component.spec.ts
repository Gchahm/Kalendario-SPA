import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeFormServicesComponent } from './employee-form-services.component';

describe('EmployeeFormServicesComponent', () => {
  let component: EmployeeFormServicesComponent;
  let fixture: ComponentFixture<EmployeeFormServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeFormServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeFormServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
