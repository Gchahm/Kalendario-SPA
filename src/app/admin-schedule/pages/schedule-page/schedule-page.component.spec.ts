import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SchedulePageComponent} from './schedule-page.component';
import {MatDialog} from '@angular/material/dialog';
import {ScheduleAdminClient} from '@api/clients';
import {ModelViewSetClientMock} from '@api/testing';

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
      ],
      providers: [
        {provide: ScheduleAdminClient, useValue: ModelViewSetClientMock},
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
