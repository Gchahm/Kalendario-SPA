import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingPageToolbarComponent } from './scheduling-page-toolbar.component';

describe('SchedulingPageToolbarComponent', () => {
  let component: SchedulingPageToolbarComponent;
  let fixture: ComponentFixture<SchedulingPageToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulingPageToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulingPageToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
