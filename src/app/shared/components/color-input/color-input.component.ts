import {Component, DoCheck, Input, OnDestroy, Optional, Self} from '@angular/core';
import {Subject} from 'rxjs';
import {ControlValueAccessor, FormControl, FormGroup, NgControl, Validators} from '@angular/forms';

@Component({
  selector: 'color-input',
  templateUrl: './color-input.component.html',
  styleUrls: ['./color-input.component.scss'],
})
export class ColorInputComponent implements ControlValueAccessor, DoCheck, OnDestroy {
  colorParts: FormGroup;
  stateChanges = new Subject<void>();

  @Input()
  get value(): string | null {
    if (this.colorParts.valid) {
      const {value: {color}} = this.colorParts;
      return color;
    }
    return null;
  }

  set value(color: string | null) {
    color = color || '#FFFFFF';
    this.colorParts.setValue({color});
    this.stateChanges.next();
    this.onChange(color);
  }

  onChange = (_: any) => {};
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  onTouched = () => {};
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(color: string | null): void {
    this.value = color;
  }

  ngDoCheck(): void {
    if (this.ngControl) {
      this.stateChanges.next();
    }
  }

  constructor(@Optional() @Self() public ngControl: NgControl) {
    this.colorParts = new FormGroup({
      color: new FormControl('#FFFFFF', [Validators.required]),
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
