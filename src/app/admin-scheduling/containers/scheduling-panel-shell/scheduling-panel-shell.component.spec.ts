import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SchedulingPanelShellComponent} from './scheduling-panel-shell.component';
import {MatDialog} from '@angular/material/dialog';
import {MatDialogMock} from '@shared/test/stubs';
import {MatMenuModule} from '@angular/material/menu';
import * as moment from 'moment';
import {Employee, IEmployee, ISchedule} from '@api/models';
import {AppointmentAdminClient} from '@api/clients';
import {ModelViewSetClientMock} from '@api/testing';
import {Schedule} from '@api/models/ISchedule';

describe('SchedulingPanelComponent', () => {
  let component: SchedulingPanelShellComponent;
  let fixture: ComponentFixture<SchedulingPanelShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatMenuModule,
      ],
      declarations: [SchedulingPanelShellComponent],
      providers: [
        {provide: AppointmentAdminClient, useClass: ModelViewSetClientMock},
        {provide: MatDialog, useClass: MatDialogMock}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulingPanelShellComponent);
    component = fixture.componentInstance;
    component.employee = new Employee();
    component.schedule = new Schedule();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
