import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateShiftDialogComponent } from './create-shift-dialog.component';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatDialogRefMock} from '@shared/test/stubs';

describe('CreateShiftDialogComponent', () => {
  let component: CreateShiftDialogComponent;
  let fixture: ComponentFixture<CreateShiftDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [ CreateShiftDialogComponent ],
      providers: [
        {provide: MatDialogRef, useClass: MatDialogRefMock},
      ]
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
