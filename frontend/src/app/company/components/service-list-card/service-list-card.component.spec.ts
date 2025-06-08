import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceListCardComponent } from './service-list-card.component';

describe('ServiceListCardComponent', () => {
  let component: ServiceListCardComponent;
  let fixture: ComponentFixture<ServiceListCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceListCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
