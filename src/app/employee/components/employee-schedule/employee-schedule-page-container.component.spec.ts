import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSchedulePageContainerComponent } from './employee-schedule-page-container.component';

describe('EmployeeScheduleComponent', () => {
  let component: EmployeeSchedulePageContainerComponent;
  let fixture: ComponentFixture<EmployeeSchedulePageContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeSchedulePageContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSchedulePageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
