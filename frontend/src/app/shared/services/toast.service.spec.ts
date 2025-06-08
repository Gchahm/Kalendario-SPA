import {TestBed} from '@angular/core/testing';

import {ToastService} from './toast.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSnackBarMock} from '../test/stubs';

describe('ToastService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provide: MatSnackBar, useClass: MatSnackBarMock}
    ]
  }));

  it('should be created', () => {
    const service: ToastService = TestBed.inject(ToastService);
    expect(service).toBeTruthy();
  });
});
