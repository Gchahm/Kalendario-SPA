import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleViewComponent } from './schedule-view.component';
import {AdminServiceMock} from '@admin-schedule/test/stubs';
import {MatDialog} from '@angular/material/dialog';
import {MatDialogMock} from '@shared/test/stubs';
import {AppointmentService} from '@shared/services/appointment.service';
import {MatMenuModule} from '@angular/material/menu';
import {Employee} from '@core/models/Employee';
import * as moment from 'moment';
import {Schedule} from '@core/models/Schedule';

describe('ScheduleViewComponent', () => {
  let component: ScheduleViewComponent;
  let fixture: ComponentFixture<ScheduleViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatMenuModule,
      ],
      declarations: [ ScheduleViewComponent ],
      providers: [
        {provide: AppointmentService, useClass: AdminServiceMock},
        {provide: MatDialog, useClass: MatDialogMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleViewComponent);
    component = fixture.componentInstance;
    component.employee = new Employee();
    component.currentDate = moment.utc();
    component.schedule = new Schedule();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
