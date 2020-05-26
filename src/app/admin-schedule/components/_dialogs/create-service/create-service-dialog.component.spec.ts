import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServiceDialogComponent } from './create-service-dialog.component';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatDialogRefMock} from '@shared/test/stubs';

describe('CreateServiceDialogComponent', () => {
  let component: CreateServiceDialogComponent;
  let fixture: ComponentFixture<CreateServiceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [ CreateServiceDialogComponent ],
      providers: [
        {provide: MatDialogRef, useClass: MatDialogRefMock},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateServiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
