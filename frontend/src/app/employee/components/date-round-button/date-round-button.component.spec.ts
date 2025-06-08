import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateRoundButtonComponent } from './date-round-button.component';

describe('DateRoundButtonComponent', () => {
  let component: DateRoundButtonComponent;
  let fixture: ComponentFixture<DateRoundButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateRoundButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateRoundButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
