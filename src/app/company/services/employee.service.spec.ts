import { TestBed } from '@angular/core/testing';

import { EmployeeService } from './employee.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MockNgRedux, NgReduxTestingModule} from '@angular-redux/store/testing';
import {ShiftAdapter} from '@core/models/Shift';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSnackBarMock} from '@shared/test/stubs';

describe('EmployeeService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      NgReduxTestingModule
    ],
    providers: [
      EmployeeService,
      ShiftAdapter,
      MockNgRedux,
      {provide: MatSnackBar, useClass: MatSnackBarMock}
      ]
  }));

  it('should be created', () => {
    const service: EmployeeService = TestBed.inject(EmployeeService);
    expect(service).toBeTruthy();
  });
});
