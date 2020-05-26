import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmployeeDialogComponent } from './create-employee-dialog.component';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatDialogRefMock} from '@shared/test/stubs';

describe('CreateEmployeeDialogComponent', () => {
  let component: CreateEmployeeDialogComponent;
  let fixture: ComponentFixture<CreateEmployeeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [ CreateEmployeeDialogComponent ],
      providers: [
        {provide: MatDialogRef, useClass: MatDialogRefMock},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEmployeeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
