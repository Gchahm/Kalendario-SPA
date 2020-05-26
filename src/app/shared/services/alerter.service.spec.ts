import { TestBed } from '@angular/core/testing';

import { AlerterService } from './alerter.service';
import {MatDialog} from '@angular/material/dialog';
import {MatDialogMock} from '@shared/test/stubs';

describe('AlerterService', () => {
  let service: AlerterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: MatDialog, useClass: MatDialogMock}
      ]
    });
    service = TestBed.inject(AlerterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
