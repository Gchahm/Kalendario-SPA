import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminDashboardComponent} from './admin-dashboard.component';
import {CustomerAdminClient, EmployeeAdminClient, ScheduleAdminClient, ServiceAdminClient} from '@api/clients';
import {ModelViewSetClientMock} from '@api/testing';

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [AdminDashboardComponent],
      providers: [
        {provide: EmployeeAdminClient, useClass: ModelViewSetClientMock},
        {provide: ServiceAdminClient, useClass: ModelViewSetClientMock},
        {provide: ScheduleAdminClient, useClass: ModelViewSetClientMock},
        {provide: CustomerAdminClient, useClass: ModelViewSetClientMock},
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
