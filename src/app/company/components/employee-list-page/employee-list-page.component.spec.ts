import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListPageComponent } from './employee-list-page.component';
import {EmployeeService} from '@app/company/services/employee.service';
import {EmployeeServiceMock} from '@core/test/stubs';

describe('EmployeeListPageComponent', () => {
  let component: EmployeeListPageComponent;
  let fixture: ComponentFixture<EmployeeListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeListPageComponent ],
      providers: [
        {provide: EmployeeService, useClass: EmployeeServiceMock}
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
