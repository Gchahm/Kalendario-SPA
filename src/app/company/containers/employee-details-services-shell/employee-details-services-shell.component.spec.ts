import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDetailsServicesShellComponent } from './employee-details-services-shell.component';

describe('EmployeeDetailsServicesShellComponent', () => {
  let component: EmployeeDetailsServicesShellComponent;
  let fixture: ComponentFixture<EmployeeDetailsServicesShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDetailsServicesShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDetailsServicesShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
