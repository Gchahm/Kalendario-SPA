import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardContainerShellComponent } from './dashboard-container-shell.component';

describe('DashboardContainerShellComponent', () => {
  let component: DashboardContainerShellComponent;
  let fixture: ComponentFixture<DashboardContainerShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardContainerShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardContainerShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
