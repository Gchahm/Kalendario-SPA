import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSchedulePageComponent } from './employee-schedule-page.component';

describe('EmployeeSchedulePageComponent', () => {
  let component: EmployeeSchedulePageComponent;
  let fixture: ComponentFixture<EmployeeSchedulePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeSchedulePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSchedulePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
