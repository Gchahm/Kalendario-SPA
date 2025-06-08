import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRwComponent } from './employee-rw.component';

describe('EmployeeRwComponent', () => {
  let component: EmployeeRwComponent;
  let fixture: ComponentFixture<EmployeeRwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeRwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeRwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
