import { TestBed } from '@angular/core/testing';

import { ServiceService } from './service.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MockNgRedux, NgReduxTestingModule} from '@angular-redux/store/testing';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ServiceAdapter} from '@core/models/Service';
import {MatSnackBarMock} from '@shared/test/stubs';

describe('ServiceService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      NgReduxTestingModule
    ],
    providers: [
      ServiceService,
      ServiceAdapter,
      MockNgRedux,
      {provide: MatSnackBar, useClass: MatSnackBarMock}
    ]

  }));

  it('should be created', () => {
    const service: ServiceService = TestBed.inject(ServiceService);
    expect(service).toBeTruthy();
  });
});
