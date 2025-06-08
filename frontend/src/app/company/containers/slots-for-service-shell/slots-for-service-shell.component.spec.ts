import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotsForServiceShellComponent } from './slots-for-service-shell.component';

describe('EmployeeDetailsSlotsShellComponent', () => {
  let component: SlotsForServiceShellComponent;
  let fixture: ComponentFixture<SlotsForServiceShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlotsForServiceShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotsForServiceShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
