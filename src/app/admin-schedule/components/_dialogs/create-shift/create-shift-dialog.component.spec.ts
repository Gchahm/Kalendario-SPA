import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateShiftDialogComponent } from './create-shift-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';

describe('CreateShiftDialogComponent', () => {
  let component: CreateShiftDialogComponent;
  let fixture: ComponentFixture<CreateShiftDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [ CreateShiftDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateShiftDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
