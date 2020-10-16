import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotsForServiceComponent } from './slots-for-service.component';

describe('EmployeeDetailsSlotsComponent', () => {
  let component: SlotsForServiceComponent;
  let fixture: ComponentFixture<SlotsForServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlotsForServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotsForServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
