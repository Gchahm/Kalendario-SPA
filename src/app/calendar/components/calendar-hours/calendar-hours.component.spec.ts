import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarHoursComponent } from './calendar-hours.component';

describe('CalendarHoursComponent', () => {
  let component: CalendarHoursComponent;
  let fixture: ComponentFixture<CalendarHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarHoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
