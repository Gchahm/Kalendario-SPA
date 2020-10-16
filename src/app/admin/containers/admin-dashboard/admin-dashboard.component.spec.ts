import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminDashboardComponent} from './admin-dashboard.component';
import {MockNgRedux, NgReduxTestingModule} from '@angular-redux/store/testing';
import {NgRedux} from '@angular-redux/store';
import {CustomerAdminClient, EmployeeAdminClient, ScheduleAdminClient, ServiceAdminClient, ShiftAdminClient} from '@api/clients';
import {ModelViewSetClientMock} from '@api/testing';

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgReduxTestingModule,
      ],
      declarations: [AdminDashboardComponent],
      providers: [
        {provide: EmployeeAdminClient, useClass: ModelViewSetClientMock},
        {provide: ServiceAdminClient, useClass: ModelViewSetClientMock},
        {provide: ScheduleAdminClient, useClass: ModelViewSetClientMock},
        {provide: ShiftAdminClient, useClass: ModelViewSetClientMock},
        {provide: CustomerAdminClient, useClass: ModelViewSetClientMock},
        {provide: NgRedux, useClass: MockNgRedux},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
