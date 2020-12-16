import {Component, DoCheck, Input, OnDestroy, Optional, Self} from '@angular/core';
import {AbstractControl, ControlValueAccessor, FormControl, FormGroup, NgControl, Validators} from '@angular/forms';
import {interval, Observable, Subject, Subscription} from 'rxjs';
import {debounce, debounceTime, filter, map, switchMap, tap} from 'rxjs/operators';
import {ICustomer} from '@api/models';
import {Store} from '@ngrx/store';
import {State} from '@admin/state';
import * as fromCustomers from '@app/admin-customers/state';
import {CustomerAdminClient} from '@api/clients';
import {MatDialog} from '@angular/material/dialog';
import {CreateCustomerDialogComponent} from '@shared/containers/create-customer/create-customer-dialog.component';

@Component({
  selector: 'shared-customer-input',
  templateUrl: './customer-input.component.html',
  styleUrls: ['./customer-input.component.css'],
})
export class CustomerInputComponent implements ControlValueAccessor, DoCheck, OnDestroy {
  form: FormGroup;
  stateChanges = new Subject<void>();

  customer$: Observable<ICustomer>;
  customers$: Observable<ICustomer[]>;
  isLoading = false;

  @Input()
  get value(): number | null {
    if (this.form.valid) {
      const {value: {id}} = this.form;
      return id;
    }
    return null;
  }

  set value(id: number | null) {
    id = id || 0;
    this.form.setValue({id});
    this.stateChanges.next();
    this.onChange(id);
  }

  onChange = (_: any) => {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  onTouched = () => {
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(id: number | null): void {
    if (!isNaN(id) && id > 0) {
      this.customer$ = this.customerClient.detail(id).pipe(
        tap(({name}) => this.form.patchValue({name}))
      );
      this.form.patchValue({id});
    }
  }

  ngDoCheck(): void {
    if (this.ngControl) {
      this.stateChanges.next();
    }
  }

  constructor(private customerClient: CustomerAdminClient,
              private matDialog: MatDialog,
              @Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
    this.buildFormAndSubscribe();
  }

  buildFormAndSubscribe() {
    this.form = new FormGroup({
      id: new FormControl(0, [Validators.required]),
      name: new FormControl(''),
    });

    this.customers$ = this.form.get('name')
      .valueChanges.pipe(
        debounce(() => interval(300)),
        switchMap((search: string) => this.customerClient.get({search})),
        map(r => r.results)
      );
  }

  createCustomer() {
    this.customer$ = this.matDialog.open(CreateCustomerDialogComponent)
      .afterClosed().pipe(
        tap(customer => this.form.patchValue({id: customer?.id, name: customer?.name})),
        tap(customer => this.onChange(customer?.id))
      );
  }

  onKeyPress(key: KeyboardEvent) {
    if (key.code === 'Backspace' && this.form.value.id !== 0) {
      this.form.patchValue({id: 0, name: ''});
    }
  }

  selected(customer: ICustomer) {
    this.form.patchValue({
      id: customer.id,
    });
    this.onChange(this.value);
  }

  ngOnDestroy() {
    this.stateChanges.complete();
  }


}
