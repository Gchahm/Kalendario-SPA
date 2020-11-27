import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingPanelContainerComponent } from './scheduling-panel-container.component';

describe('SchedulingPanelContainerComponent', () => {
  let component: SchedulingPanelContainerComponent;
  let fixture: ComponentFixture<SchedulingPanelContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulingPanelContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulingPanelContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
