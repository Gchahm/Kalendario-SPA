import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerInputComponent } from './customer-input.component';
import {FormBuilder} from '@angular/forms';
import {AdminServiceMock} from '@admin-schedule/test/stubs';
import {CustomerService} from '@admin-schedule/services/customer.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

describe('CustomerInputComponent', () => {
  let component: CustomerInputComponent;
  let fixture: ComponentFixture<CustomerInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatAutocompleteModule,
      ],
      declarations: [ CustomerInputComponent ],
      providers: [
        FormBuilder,
        {provide: CustomerService, useClass: AdminServiceMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
