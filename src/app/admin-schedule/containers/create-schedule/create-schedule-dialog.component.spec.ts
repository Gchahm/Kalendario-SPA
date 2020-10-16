import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateScheduleDialogComponent} from './create-schedule-dialog.component';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatDialogRefMock} from '@shared/test/stubs';

describe('CreateScheduleDialogComponent', () => {
  let component: CreateScheduleDialogComponent;
  let fixture: ComponentFixture<CreateScheduleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [CreateScheduleDialogComponent],
      providers: [
        {provide: MatDialogRef, useClass: MatDialogRefMock},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateScheduleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
