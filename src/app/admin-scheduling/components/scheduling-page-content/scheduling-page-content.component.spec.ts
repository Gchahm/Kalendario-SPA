import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingPageContentComponent } from './scheduling-page-content.component';

describe('SchedulingPageContentComponent', () => {
  let component: SchedulingPageContentComponent;
  let fixture: ComponentFixture<SchedulingPageContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulingPageContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulingPageContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
