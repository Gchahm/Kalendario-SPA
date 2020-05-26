import { TestBed } from '@angular/core/testing';

import { ScheduleService } from './schedule.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MockNgRedux, NgReduxTestingModule} from '@angular-redux/store/testing';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ScheduleAdapter} from '@core/models/Schedule';
import {MatSnackBarMock} from '@shared/test/stubs';

describe('ScheduleService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
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
    })
  });

  it('should be created', () => {
    const service: ScheduleService = TestBed.inject(ScheduleService);
    expect(service).toBeTruthy();
  });
});
