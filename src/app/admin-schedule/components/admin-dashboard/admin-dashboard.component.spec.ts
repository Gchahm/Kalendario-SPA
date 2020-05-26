import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardComponent } from './admin-dashboard.component';
import {MockNgRedux, NgReduxTestingModule} from '@angular-redux/store/testing';
import {AdminServiceMock} from '@admin-schedule/test/stubs';
import {AdminEmployeeService} from '@admin-schedule/services/admin-employee.service';
import {ServiceService} from '@admin-schedule/services/service.service';
import {ScheduleService} from '@admin-schedule/services/schedule.service';
import {ShiftService} from '@admin-schedule/services/shift.service';
import {CustomerService} from '@admin-schedule/services/customer.service';
import {NgRedux} from '@angular-redux/store';
import {IAppState, INITIAL_STATE} from '@app/Store';
import {User} from '@core/models/User';
import {Company} from '@core/models/Company';

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;
  let redux: NgRedux<IAppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgReduxTestingModule,
      ],
      declarations: [ AdminDashboardComponent ],
      providers: [
        {provide: AdminEmployeeService, useClass: AdminServiceMock},
        {provide: ServiceService, useClass: AdminServiceMock},
        {provide: ScheduleService, useClass: AdminServiceMock},
        {provide: ShiftService, useClass: AdminServiceMock},
        {provide: CustomerService, useClass: AdminServiceMock},
        {provide: NgRedux, useClass: MockNgRedux},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    redux = TestBed.inject(NgRedux);
    let state = INITIAL_STATE;
    state.core.user = new User();
    state.core.user.company = new Company();
    spyOn(redux, 'getState').and.callFake(() => {
      return state;
    });

    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
