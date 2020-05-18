import {Component, DoCheck, ElementRef, Input, OnDestroy, OnInit, Optional, Self} from '@angular/core';
import {MatFormFieldControl} from '@angular/material/form-field';
import {ControlValueAccessor, FormBuilder, FormGroup, NgControl, Validators} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {FocusMonitor} from '@angular/cdk/a11y';
import {CustomerService} from '../../../admin-schedule/services/customer.service';
import {Customer} from '../../../core/models/Customer';
import {debounceTime, finalize, map, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-customer-input',
  templateUrl: './customer-input.component.html',
  styleUrls: ['./customer-input.component.css'],
  providers: [{provide: MatFormFieldControl, useExisting: CustomerInputComponent}],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy',
  }
})
export class CustomerInputComponent implements MatFormFieldControl<number>, ControlValueAccessor, DoCheck, OnInit, OnDestroy {
  static nextId = 0;

  form: FormGroup;
  stateChanges = new Subject<void>();
  focused = false;
  controlType = 'customer-input';

  customers$: Observable<Customer[]>;
  isLoading = false;

  id = `customer-input-${CustomerInputComponent.nextId++}`;
  describedBy = '';
  onChange = (_: any) => {
  };
  onTouched = () => {
  };

  get empty() {
    const {value: {id, name}} = this.form;

    return !id && !name;
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
    this._disabled ? this.form.disable() : this.form.enable();
    this.stateChanges.next();
  }

  private _disabled = false;

  @Input()
  get value(): number | null {
    if (this.form.valid) {
      const {value: {id, name}} = this.form;
      return id;
    }
    return null;
  }

  set value(id: number | null) {
    id = id || 0;
    this.form.patchValue({id: id});
    this.stateChanges.next();
    this.onChange(id);
  }

  errorState: boolean;

  ngDoCheck(): void {
    if (this.ngControl) {
      this.errorState = this.ngControl.invalid && this.ngControl.touched;
      this.stateChanges.next();
    }
  }

  constructor(
    formBuilder: FormBuilder,
    private customerService: CustomerService,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Self() public ngControl: NgControl) {

    this.form = formBuilder.group({
      id: [0, [Validators.required]],
      name: ''
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

  ngOnInit() {
    this.customers$ = this.form
      .get('name')
      .valueChanges
      .pipe(
        debounceTime(300),
        tap(() => this.isLoading = true),
        switchMap(value => this.customerService.get({search: value})
          .pipe(
            map(res => res.results),
            finalize(() => this.isLoading = false)
          )
        )
      );
  }

  onKeyPress(key: KeyboardEvent) {
    if (key.code === 'Backspace') {
      this.form.patchValue({id: 0, name: ''})
    }
  }

  selected(customer: Customer) {
    // TODO: Remove focus from input when a customer is selected
    this.form.patchValue({id: customer.id});
    this.onChange(this.value);
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

  writeValue(id: number | null): void {
    if (!isNaN(id) && id > 0) {
      this.customerService.detail(id)
        .toPromise()
        .then(res => {
          this.form.patchValue({name: res.name})
        })
    }
    this.value = id;
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

  static ngAcceptInputType_disabled: boolean | string | null | undefined;
  static ngAcceptInputType_required: boolean | string | null | undefined;
}
