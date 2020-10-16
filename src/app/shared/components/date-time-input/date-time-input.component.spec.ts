import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DateTimeInputComponent} from './date-time-input.component';
import {FormBuilder} from '@angular/forms';
import * as moment from 'moment';

describe('DateTimeInputComponent', () => {
  let component: DateTimeInputComponent;
  let fixture: ComponentFixture<DateTimeInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DateTimeInputComponent],
      providers: [
        FormBuilder
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTimeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get value should return a moment object', () => {
    let value = moment.utc();
    component.writeValue(value);

    expect(component.value).toEqual(value);
  });
});
