import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotEventComponent } from './slot-event.component';

describe('SlotEventComponent', () => {
  let component: SlotEventComponent;
  let fixture: ComponentFixture<SlotEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlotEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
