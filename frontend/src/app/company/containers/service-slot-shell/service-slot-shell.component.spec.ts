import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceSlotShellComponent } from './service-slot-shell.component';

describe('ServiceSlotShellComponent', () => {
  let component: ServiceSlotShellComponent;
  let fixture: ComponentFixture<ServiceSlotShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceSlotShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceSlotShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
