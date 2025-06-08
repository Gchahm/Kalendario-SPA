import {Component, DoCheck, Input, OnDestroy, Optional, Self} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, NgControl, Validators} from '@angular/forms';
import * as moment from 'moment';
import {Moment} from 'moment';
import {Subject} from 'rxjs';

@Component({
  selector: 'date-time-pretty-input',
  templateUrl: './date-time-pretty-input.component.html',
  styleUrls: ['./date-time-pretty-input.component.css'],
})
export class DateTimePrettyInputComponent implements ControlValueAccessor, DoCheck, OnDestroy {
  form: FormGroup;
  stateChanges = new Subject<void>();

  @Input()
  get value(): Moment | null {
    if (this.form.valid) {
      const {date, time} = this.form.getRawValue();
      date.set({
        hours: time ? +time.substr(0, 2) : 0,
        minutes: time ? +time.substr(3, 2) : 0
      });
      return date;
    }
    return null;
  }

  set value(date: Moment | null) {
    date = date || moment.utc();
    const time = date.format('HH:mm');
    this.form.setValue({date, time});
    this.stateChanges.next();
  }

  onChange = (_: any) => {
  };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  onTouched = () => {
  };

  registerOnTouched(fn: any): void {
  }

  writeValue(time: Moment | null): void {
    this.value = time;
  }

  _handleInput(): void {
    this.onChange(this.value);
  }

  ngDoCheck(): void {
    if (this.ngControl) {
      this.stateChanges.next();
    }
  }

  ngOnDestroy() {
    this.stateChanges.complete();
  }

  buildForm() {
    this.form = new FormGroup({
      date: new FormControl(moment.utc(), [Validators.required]),
      time: new FormControl(0, [Validators.required])
    });
  }

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
    this.buildForm();
  }
}

