import {Component, DoCheck, Input, OnDestroy, Optional, Self} from '@angular/core';
import {Subject} from 'rxjs';
import {ControlValueAccessor, FormBuilder, FormGroup, NgControl, Validators} from '@angular/forms';
import {TimeOfDay} from '@api/models/TimeOfDay';

@Component({
  selector: 'duration-input',
  templateUrl: './duration-input.component.html',
  styleUrls: ['./duration-input.component.css'],
})
export class DurationInputComponent implements ControlValueAccessor, DoCheck, OnDestroy {
  durationParts: FormGroup;
  stateChanges = new Subject<void>();

  @Input()
  get value(): string | null {
    if (this.durationParts.valid) {
      const {value: {hour, minute}} = this.durationParts;
      const tod = new TimeOfDay(hour, minute);
      return tod.toISOString();
    }
    return null;
  }

  set value(timeOfDay: string | null) {
    timeOfDay = timeOfDay || '00:00';
    const {hour, minute} = TimeOfDay.fromString(timeOfDay);
    this.durationParts.setValue({hour, minute});
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
    this.onTouched = fn;
  }

  writeValue(timeOfDay: string | null): void {
    this.value = timeOfDay;
  }


  ngDoCheck(): void {
    if (this.ngControl) {
      this.stateChanges.next();
    }
  }

  constructor(formBuilder: FormBuilder,
              @Optional() @Self() public ngControl: NgControl) {
    this.durationParts = formBuilder.group({
      hour: [0, [Validators.required, Validators.min(0), Validators.max(23)]],
      minute: [0, [Validators.required, Validators.min(0), Validators.max(60)]],
    });

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnDestroy() {
    this.stateChanges.complete();
  }

  _handleInput(): void {
    this.onChange(this.value);
  }
}
