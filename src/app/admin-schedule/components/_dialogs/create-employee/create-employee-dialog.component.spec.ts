import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmployeeDialogComponent } from './create-employee-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';

describe('CreateEmployeeDialogComponent', () => {
  let component: CreateEmployeeDialogComponent;
  let fixture: ComponentFixture<CreateEmployeeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [ CreateEmployeeDialogComponent ]
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
