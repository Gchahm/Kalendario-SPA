import { TestBed } from '@angular/core/testing';

import { AlerterService } from './alerter.service';

describe('AlerterService', () => {
  let service: AlerterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlerterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
