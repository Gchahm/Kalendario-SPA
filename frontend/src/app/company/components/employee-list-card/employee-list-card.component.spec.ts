import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListCardComponent } from './employee-list-card.component';

describe('EmployeeListCardComponent', () => {
  let component: EmployeeListCardComponent;
  let fixture: ComponentFixture<EmployeeListCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeListCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
