import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSchedulePageHeaderComponent } from './employee-schedule-page-header.component';

describe('EmployeeScheduleComponent', () => {
  let component: EmployeeSchedulePageHeaderComponent;
  let fixture: ComponentFixture<EmployeeSchedulePageHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeSchedulePageHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSchedulePageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
