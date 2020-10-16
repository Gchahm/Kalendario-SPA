import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CustomerDetailsComponent} from './customer-details.component';
import {FormBuilder} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {MatDialogMock} from '@shared/test/stubs';
import {AppointmentAdminClient} from '@api/clients';
import {ModelViewSetClientMock} from '@api/testing';
import {Customer} from '@api/models';

describe('CustomerDetailsComponent', () => {
  let component: CustomerDetailsComponent;
  let fixture: ComponentFixture<CustomerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerDetailsComponent],
      providers: [
        {provide: AppointmentAdminClient, useClass: ModelViewSetClientMock},
        {provide: MatDialog, useClass: MatDialogMock},
        FormBuilder,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDetailsComponent);
    component = fixture.componentInstance;
    component.model = new Customer();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
