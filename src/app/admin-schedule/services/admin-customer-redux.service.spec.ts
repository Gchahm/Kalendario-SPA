import { TestBed } from '@angular/core/testing';

import { AdminCustomerReduxService } from './admin-customer-redux.service';

describe('AdminCustomerReduxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminCustomerReduxService = TestBed.get(AdminCustomerReduxService);
    expect(service).toBeTruthy();
  });
});
