import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotForServiceHeaderComponent } from './slot-for-service-header.component';

describe('SlotForServiceHeaderComponent', () => {
  let component: SlotForServiceHeaderComponent;
  let fixture: ComponentFixture<SlotForServiceHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlotForServiceHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotForServiceHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
