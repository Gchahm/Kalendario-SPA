import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMobileContainerComponent } from './dashboard-mobile-container.component';

describe('DashboardMobileContainerComponent', () => {
  let component: DashboardMobileContainerComponent;
  let fixture: ComponentFixture<DashboardMobileContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardMobileContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMobileContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
