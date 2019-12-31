import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleDetailShiftComponent } from './schedule-detail-shift.component';

describe('ScheduleDetailShiftComponent', () => {
  let component: ScheduleDetailShiftComponent;
  let fixture: ComponentFixture<ScheduleDetailShiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleDetailShiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleDetailShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
