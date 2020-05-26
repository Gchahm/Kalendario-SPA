
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeDetailPageComponent } from './employee-detail-page.component';
import {MockNgRedux} from '@angular-redux/store/testing';
import {EmployeeService} from '@app/company/services/employee.service';
import {ActivatedRoute, convertToParamMap, Router} from '@angular/router';
import {EmployeeServiceMock} from '@core/test/stubs';
import {RouterMock} from '@shared/test/stubs';
import {NgRedux} from '@angular-redux/store';

describe('EmployeeDetailPageComponent', () => {
  let component: EmployeeDetailPageComponent;
  let fixture: ComponentFixture<EmployeeDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDetailPageComponent ],
      providers: [
        {provide: EmployeeService, useClass: EmployeeServiceMock},
        {provide: ActivatedRoute, useValue: {snapshot: {paramMap: convertToParamMap({id: '1'})}}},
        {provide: Router, useClass: RouterMock},
        {provide: NgRedux, useClass: MockNgRedux},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
