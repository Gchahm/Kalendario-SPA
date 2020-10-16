import {Component, DoCheck, Input, OnDestroy, Optional, Self} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, NgControl, Validators} from '@angular/forms';
import {Observable, Subject, Subscription} from 'rxjs';
import {debounceTime, switchMap} from 'rxjs/operators';
import {Customer} from '@api/models';
import {Store} from '@ngrx/store';
import {State} from '@admin/state';
import * as fromCustomers from '@app/admin-customers/state';

@Component({
  selector: 'admin-customer-input',
  templateUrl: './customer-input.component.html',
  styleUrls: ['./customer-input.component.css'],
})
export class CustomerInputComponent implements ControlValueAccessor, DoCheck, OnDestroy {
  form: FormGroup;
  stateChanges = new Subject<void>();
  subscription1: Subscription;
  subscription2: Subscription;

  customer: Customer;
  customers$: Observable<Customer[]>;
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
  };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  onTouched = () => {
  };

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(id: number | null): void {
    if (!isNaN(id) && id > 0) {
      this.store.dispatch(fromCustomers.actions.requestEntity({id}));
      this.form.patchValue({id});
    }
  }

  ngDoCheck(): void {
    if (this.ngControl) {
      this.stateChanges.next();
    }
  }

  constructor(private store: Store<State>,
              @Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
    this.buildFormAndSubscribe();
  }

  buildFormAndSubscribe() {
    this.form =  new FormGroup({
      id: new FormControl(0, [Validators.required]),
      name: new FormControl(''),
    });

    let name = '';

    this.subscription1 = this.form.get('name')
      .valueChanges.pipe(debounceTime(300))
      .subscribe(value => {
        if (value !== name) {
          this.store.dispatch(fromCustomers.actions.requestEntities({params: {search: value}}));
          this.customers$ = this.store.select(fromCustomers.selectors.getBySearch, value);
          name = value;
        }
      });

    this.subscription2 = this.form.get('id')
      .valueChanges.pipe(
        switchMap(res => this.store.select(fromCustomers.selectors.getById, res))
      ).subscribe(customer => {
        if (customer) {
          this.customer = customer;
          this.form.patchValue({
            name: customer.name,
          });
        }
      });
  }

  createCustomer() {
    this.store.dispatch(fromCustomers.actions.openFormDialog({id: 0}));
  }

  onKeyPress(key: KeyboardEvent) {
    if (key.code === 'Backspace') {
      this.form.patchValue({id: 0, name: ''});
    }
  }

  selected(customer: Customer) {
    this.form.patchValue({
      id: customer.id,
    });
    this.onChange(this.value);
  }

  ngOnDestroy() {
    this.store.dispatch(fromCustomers.actions.setSearch({value: ''}));
    this.stateChanges.complete();
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }


}
