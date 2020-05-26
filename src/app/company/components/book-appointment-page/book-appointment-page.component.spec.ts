import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAppointmentPageComponent } from './book-appointment-page.component';
import {AppointmentService} from '@shared/services/appointment.service';
import {DjangoRWModelServiceMock, EmployeeServiceMock} from '@core/test/stubs';
import {EmployeeService} from '@app/company/services/employee.service';
import {ToastService} from '@shared/services/toast.service';
import {RouterMock, ToastServiceMock} from '@shared/test/stubs';
import {ActivatedRoute, convertToParamMap, Router} from '@angular/router';
import {NgReduxTestingModule} from '@angular-redux/store/testing';
import {of} from 'rxjs';
import {Service} from '@core/models/Service';
import {Employee} from '@core/models/Employee';

describe('BookAppointmentPageComponent', () => {
  let component: BookAppointmentPageComponent;
  let fixture: ComponentFixture<BookAppointmentPageComponent>;
  const params = {service: '1', date: '2321', employee: '1'};
  let employeeService: EmployeeService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgReduxTestingModule
      ],
      declarations: [ BookAppointmentPageComponent ],
      providers: [
        {provide: AppointmentService, useClass: DjangoRWModelServiceMock},
        {provide: EmployeeService, useClass: EmployeeServiceMock},
        {provide: ToastService, useClass: ToastServiceMock},
        {provide: Router, useClass: RouterMock},
        {provide: ActivatedRoute, useValue: {paramMap: of(convertToParamMap(params))}},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    employeeService = TestBed.inject(EmployeeService);
    spyOn(employeeService, 'detail').and.callFake(() => {
      const emp = new Employee();
      const service = new Service();
      service.id = 1;
      emp.services.push(service);
      return of(emp)
    });

    fixture = TestBed.createComponent(BookAppointmentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
