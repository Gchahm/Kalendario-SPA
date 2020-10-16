import {ControlValueAccessor, FormControl, FormGroup, NgControl} from '@angular/forms';
import {DoCheck, Input, OnDestroy, Optional, Self} from '@angular/core';
import {Subject} from 'rxjs';

export class ControlImplementation<T> implements ControlValueAccessor, DoCheck, OnDestroy {

  form: FormGroup;
  stateChanges = new Subject<void>();

  @Input()
  get value(): T | null {
    if (this.form.valid) {
      const {value: {formControl}} = this.form;
      return formControl;
    }
    return null;
  }

  set value(formControl: T | null) {
    this.form.setValue({formControl});
    this.stateChanges.next();
    this.onChange(formControl);
  }

  onChange = (_: any) => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  onTouched = () => {};

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(formControl: T | null): void {
    this.value = formControl;
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

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
    this.form = new FormGroup({
      formControl: new FormControl(''),
    });
  }
}
