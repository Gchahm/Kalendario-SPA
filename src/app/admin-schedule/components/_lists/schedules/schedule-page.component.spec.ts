import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulePageComponent } from './schedule-page.component';
import {MockNgRedux, NgReduxTestingModule} from '@angular-redux/store/testing';
import {ScheduleService} from '../../../services/schedule.service';
import {MatDialog} from '@angular/material/dialog';

describe('SchedulePageComponent', () => {
  let component: SchedulePageComponent;
  let fixture: ComponentFixture<SchedulePageComponent>;
  const matDialog = jasmine.createSpyObj('MatDialog', ['open']);
  const scheduleService = jasmine.createSpyObj('ScheduleService', ['post']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SchedulePageComponent
      ],
      imports: [
        NgReduxTestingModule
      ],
      providers: [
        MockNgRedux,
        {provide: ScheduleService, useValue: scheduleService},
        {provide: MatDialog, useValue: matDialog}
      ]
    });

    fixture = TestBed.createComponent(SchedulePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
