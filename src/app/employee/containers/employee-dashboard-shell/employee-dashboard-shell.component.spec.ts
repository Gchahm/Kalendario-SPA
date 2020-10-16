import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDashboardShellComponent } from './employee-dashboard-shell.component';

describe('DashboardContainerComponent', () => {
  let component: EmployeeDashboardShellComponent;
  let fixture: ComponentFixture<EmployeeDashboardShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDashboardShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDashboardShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
