import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateScheduleDialogComponent } from './create-schedule-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';

describe('CreateScheduleDialogComponent', () => {
  let component: CreateScheduleDialogComponent;
  let fixture: ComponentFixture<CreateScheduleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [ CreateScheduleDialogComponent ]
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
