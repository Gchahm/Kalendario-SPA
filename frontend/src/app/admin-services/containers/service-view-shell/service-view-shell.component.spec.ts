import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceViewShellComponent } from './service-view-shell.component';

describe('ServiceViewShellComponent', () => {
  let component: ServiceViewShellComponent;
  let fixture: ComponentFixture<ServiceViewShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceViewShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceViewShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
