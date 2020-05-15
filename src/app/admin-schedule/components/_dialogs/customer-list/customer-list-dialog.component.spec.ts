import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerListDialogComponent } from './customer-list-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';

describe('CustomerListDialogComponent', () => {
  let component: CustomerListDialogComponent;
  let fixture: ComponentFixture<CustomerListDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [ CustomerListDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
