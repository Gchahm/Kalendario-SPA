import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ScheduleFormComponent} from './schedule-form.component';
import {ModelViewSetClientMock} from '@api/testing';
import {ScheduleAdminClient} from '@api/clients';
import {Schedule} from '@api/models';

describe('ScheduleFormComponent', () => {
  let component: ScheduleFormComponent;
  let fixture: ComponentFixture<ScheduleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleFormComponent],
      providers: [
        {provide: ScheduleAdminClient, useClass: ModelViewSetClientMock}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleFormComponent);
    component = fixture.componentInstance;
    component.model = new Schedule();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
