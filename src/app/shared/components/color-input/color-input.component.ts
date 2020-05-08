import {Component, DoCheck, ElementRef, Input, OnDestroy, Optional, Self} from '@angular/core';
import {MatFormFieldControl} from '@angular/material/form-field';
import {Subject} from 'rxjs';
import {ControlValueAccessor, FormBuilder, FormGroup, NgControl, Validators} from '@angular/forms';
import {FocusMonitor} from '@angular/cdk/a11y';
import {coerceBooleanProperty} from '@angular/cdk/coercion';

@Component({
  selector: 'color-input',
  templateUrl: './color-input.component.html',
  styleUrls: ['./color-input.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: ColorInputComponent}],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy',
  }
})
export class ColorInputComponent implements MatFormFieldControl<string>, ControlValueAccessor, DoCheck, OnDestroy {
  static nextId = 0;

  colorParts: FormGroup;
  stateChanges = new Subject<void>();
  focused = false;
  controlType = 'duration-input';

  id = `color-input-${ColorInputComponent.nextId++}`;
  describedBy = '';
  onChange = (_: any) => {
  };
  onTouched = () => {
  };

  get empty() {
    const {value: {color}} = this.colorParts;

    return !color;
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
    this._disabled ? this.colorParts.disable() : this.colorParts.enable();
    this.stateChanges.next();
  }

  private _disabled = false;

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

    this.colorParts = formBuilder.group({
      color: ['#FFFFFF', [Validators.required]],
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

  writeValue(color: string | null): void {
    this.value = color;
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
