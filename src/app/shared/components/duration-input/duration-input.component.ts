import {Component, DoCheck, ElementRef, Input, OnDestroy, Optional, Self} from '@angular/core';
import {Subject} from 'rxjs';
import {ControlValueAccessor, FormBuilder, FormGroup, NgControl, Validators} from '@angular/forms';
import {MatFormFieldControl} from '@angular/material/form-field';
import {TimeOfDay} from '../../../core/models/TimeOfDay';
import {FocusMonitor} from '@angular/cdk/a11y';
import {coerceBooleanProperty} from '@angular/cdk/coercion';

@Component({
  selector: 'duration-input',
  templateUrl: './duration-input.component.html',
  styleUrls: ['./duration-input.component.css'],
  providers: [{provide: MatFormFieldControl, useExisting: DurationInputComponent}],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy',
  }
})
export class DurationInputComponent implements MatFormFieldControl<string>, ControlValueAccessor, DoCheck, OnDestroy {
  static nextId = 0;

  durationParts: FormGroup;
  stateChanges = new Subject<void>();
  focused = false;
  controlType = 'duration-input';

  id = `duration-input-${DurationInputComponent.nextId++}`;
  describedBy = '';
  onChange = (_: any) => {
  };
  onTouched = () => {
  };

  get empty() {
    const {value: {hour, minute}} = this.durationParts;

    return !hour && !minute;
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
    this._disabled ? this.durationParts.disable() : this.durationParts.enable();
    this.stateChanges.next();
  }

  private _disabled = false;

  @Input()
  get value(): string | null {
    if (this.durationParts.valid) {
      const {value: {hour, minute}} = this.durationParts;
      const tod = new TimeOfDay(hour, minute);
      return tod.toString();
    }
    return null;
  }

  set value(timeOfDay: string | null) {
    timeOfDay = timeOfDay || '00:00';
    const {hour, minute} = TimeOfDay.fromString(timeOfDay);
    this.durationParts.setValue({hour, minute});
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

    this.durationParts = formBuilder.group({
      hour: [0, [Validators.required, Validators.min(0), Validators.max(23)]],
      minute: [0, [Validators.required, Validators.min(0), Validators.max(60)]],
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

  writeValue(timeOfDay: string | null): void {
    this.value = timeOfDay;
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
