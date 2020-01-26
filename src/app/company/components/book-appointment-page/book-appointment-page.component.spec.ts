import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAppointmentPageComponent } from './book-appointment-page.component';

describe('ScheduleViewComponent', () => {
  let component: BookAppointmentPageComponent;
  let fixture: ComponentFixture<BookAppointmentPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookAppointmentPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookAppointmentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
