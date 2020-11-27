import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SchedulingPageComponent} from './scheduling-page.component';
import {MatMenuModule} from '@angular/material/menu';

describe('SchedulingPageComponent', () => {
  let component: SchedulingPageComponent;
  let fixture: ComponentFixture<SchedulingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatMenuModule,
      ],
      declarations: [SchedulingPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
