import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServiceDialogComponent } from './create-service-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';

describe('CreateServiceDialogComponent', () => {
  let component: CreateServiceDialogComponent;
  let fixture: ComponentFixture<CreateServiceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [ CreateServiceDialogComponent ]
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
