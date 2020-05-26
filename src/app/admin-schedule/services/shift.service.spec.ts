import {TestBed} from '@angular/core/testing';
import {ShiftService} from './shift.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MockNgRedux, NgReduxTestingModule} from '@angular-redux/store/testing';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ShiftAdapter} from '@core/models/Shift';
import {MatSnackBarMock} from '@shared/test/stubs';

describe('ShiftService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgReduxTestingModule
      ],
      providers: [
        ShiftService,
        ShiftAdapter,
        MockNgRedux,
        {provide: MatSnackBar, useClass: MatSnackBarMock}
      ]
    })
  });

  it('should be created', () => {
    const service: ShiftService = TestBed.inject(ShiftService);
    expect(service).toBeTruthy();
  });
});
