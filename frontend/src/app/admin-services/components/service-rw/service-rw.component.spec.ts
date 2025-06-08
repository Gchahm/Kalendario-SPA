import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRwComponent } from './service-rw.component';

describe('ServiceRwComponent', () => {
  let component: ServiceRwComponent;
  let fixture: ComponentFixture<ServiceRwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceRwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceRwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
