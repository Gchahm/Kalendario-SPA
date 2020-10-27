import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EmployeeViewShellComponent} from './employee-view-shell.component';
import {Employee} from '@api/models';

describe('EmployeeDetailsComponent', () => {
  let component: EmployeeViewShellComponent;
  let fixture: ComponentFixture<EmployeeViewShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeViewShellComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeViewShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
