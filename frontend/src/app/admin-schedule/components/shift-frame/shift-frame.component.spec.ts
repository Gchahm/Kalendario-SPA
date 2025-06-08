import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftFrameComponent } from './shift-frame.component';

describe('ShiftFrameComponent', () => {
  let component: ShiftFrameComponent;
  let fixture: ComponentFixture<ShiftFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
