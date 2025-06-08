import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DateTimePrettyInputComponent} from './date-time-pretty-input.component';
import {FormBuilder} from '@angular/forms';
import * as moment from 'moment';

describe('DateTimePrettyInputComponent', () => {
  let component: DateTimePrettyInputComponent;
  let fixture: ComponentFixture<DateTimePrettyInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DateTimePrettyInputComponent],
      providers: [
        FormBuilder
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTimePrettyInputComponent);
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
