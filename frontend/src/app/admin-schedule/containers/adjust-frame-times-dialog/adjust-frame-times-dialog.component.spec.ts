import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustFrameTimesDialogComponent } from './adjust-frame-times-dialog.component';

describe('AdjustFrameTimesComponent', () => {
  let component: AdjustFrameTimesDialogComponent;
  let fixture: ComponentFixture<AdjustFrameTimesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdjustFrameTimesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjustFrameTimesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
