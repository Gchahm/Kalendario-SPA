import {Component, DoCheck, ElementRef, Input, OnDestroy, Optional, Self} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NgControl, Validators} from '@angular/forms';
import {Moment} from 'moment';
import {MatFormFieldControl} from '@angular/material/form-field';
import {Subject} from 'rxjs';
import {FocusMonitor} from '@angular/cdk/a11y';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import * as moment from 'moment';

@Component({
  selector: 'date-time-input',
  templateUrl: './date-time-input.component.html',
  styleUrls: ['./date-time-input.component.css'],
  providers: [{provide: MatFormFieldControl, useExisting: DateTimeInputComponent}],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy',
  }
})
export class DateTimeInputComponent implements MatFormFieldControl<Moment>, ControlValueAccessor, DoCheck, OnDestroy {
  static nextId = 0;

  datetimeParts: FormGroup;
  stateChanges = new Subject<void>();
  focused = false;
  controlType = 'datetime-input';
  id = `example-tel-input-${DateTimeInputComponent.nextId++}`;
  describedBy = '';
  onChange = (_: any) => {
  };
  onTouched = () => {
  };

  get empty() {
    const {value: {date, time}} = this.datetimeParts;

    return !date && !time;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }

  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }

  private _placeholder: string;

  @Input()
  get required(): boolean {
    return this._required;
  }

  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  private _required = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.datetimeParts.disable() : this.datetimeParts.enable();
    this.stateChanges.next();
  }

  private _disabled = false;

  @Input()
  get value(): Moment | null {
    if (this.datetimeParts.valid) {
      const {date, time} = this.datetimeParts.getRawValue();
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
    this.datetimeParts.setValue({date, time});
    this.stateChanges.next();
  }

  errorState: boolean;

  ngDoCheck(): void {
    if(this.ngControl) {
      this.errorState = this.ngControl.invalid && this.ngControl.touched;
      this.stateChanges.next();
    }
  }

  constructor(
    formBuilder: FormBuilder,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Self() public ngControl: NgControl) {

    this.datetimeParts = formBuilder.group({
      date: [{value: moment.utc(), disabled: true}, [Validators.required]],
      time: [0, [Validators.required]],
    });

    _focusMonitor.monitor(_elementRef, true).subscribe(origin => {
      if (this.focused && !origin) {
        this.onTouched();
      }
      this.focused = !!origin;
      this.stateChanges.next();
    });

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() != 'input') {
      this._elementRef.nativeElement.querySelector<HTMLInputElement>('input')!.focus();
    }
  }

  writeValue(time: Moment | null): void {
    this.value = time;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  _handleInput(): void {
    this.onChange(this.value);
  }

  static ngAcceptInputType_disabled: boolean | string | null | undefined;
  static ngAcceptInputType_required: boolean | string | null | undefined;

}

