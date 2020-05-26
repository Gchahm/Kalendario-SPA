import { TestBed } from '@angular/core/testing';

import { AdminEmployeeService } from './admin-employee.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MockNgRedux, NgReduxTestingModule} from '@angular-redux/store/testing';
import {ScheduleService} from './schedule.service';
import {ScheduleAdapter} from '@core/models/Schedule';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSnackBarMock} from '@shared/test/stubs';

describe('AdminEmployeeService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      NgReduxTestingModule
    ],
    providers: [
      ScheduleService,
      ScheduleAdapter,
      MockNgRedux,
      {provide: MatSnackBar, useClass: MatSnackBarMock}
    ]
  }));

  it('should be created', () => {
    const service: AdminEmployeeService = TestBed.inject(AdminEmployeeService);
    expect(service).toBeTruthy();
  });
});
