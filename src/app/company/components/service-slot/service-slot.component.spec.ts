import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceSlotComponent } from './service-slot.component';

describe('ServiceSlotComponent', () => {
  let component: ServiceSlotComponent;
  let fixture: ComponentFixture<ServiceSlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceSlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
