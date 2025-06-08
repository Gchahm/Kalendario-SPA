import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarLineComponent } from './calendar-line.component';

describe('CalendarLineComponent', () => {
  let component: CalendarLineComponent;
  let fixture: ComponentFixture<CalendarLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
