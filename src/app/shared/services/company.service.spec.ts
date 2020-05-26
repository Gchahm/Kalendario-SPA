import { TestBed } from '@angular/core/testing';
import { CompanyService } from './company.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CompanyAdapter} from '@core/models/Company';

describe('CompanyService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ],
    providers: [
      CompanyAdapter,
    ]
  }));

  it('should be created', () => {
    const service: CompanyService = TestBed.inject(CompanyService);
    expect(service).toBeTruthy();
  });
});
