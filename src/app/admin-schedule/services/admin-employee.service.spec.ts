import { TestBed } from '@angular/core/testing';

import { AdminEmployeeService } from './admin-employee.service';

describe('AdminEmployeeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminEmployeeService = TestBed.get(AdminEmployeeService);
    expect(service).toBeTruthy();
  });
});
