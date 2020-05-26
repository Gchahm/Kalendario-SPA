import { TestBed } from '@angular/core/testing';
import {CustomerService} from './customer.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MockNgRedux, NgReduxTestingModule} from '@angular-redux/store/testing';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CustomerAdapter} from '@core/models/Customer';
import {MatSnackBarMock} from '@shared/test/stubs';

describe('CustomerService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgReduxTestingModule
      ],
      providers: [
        CustomerService,
        CustomerAdapter,
        MockNgRedux,
        {provide: MatSnackBar, useClass: MatSnackBarMock}
      ]
    })
  });

  it('should be created', () => {
    const service: CustomerService = TestBed.inject(CustomerService);
    expect(service).toBeTruthy();
  });
});
