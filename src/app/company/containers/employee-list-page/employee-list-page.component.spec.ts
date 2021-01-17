import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EmployeeListPageComponent} from './employee-list-page.component';
import {EmployeeAdminClient} from '@api/clients';
import {ReadOnlyModelViewSetClientMock} from '@api/testing';

describe('CompanyEmployeesShell', () => {
  let component: EmployeeListPageComponent;
  let fixture: ComponentFixture<EmployeeListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeListPageComponent],
      providers: [
        {provide: EmployeeAdminClient, useClass: ReadOnlyModelViewSetClientMock},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
