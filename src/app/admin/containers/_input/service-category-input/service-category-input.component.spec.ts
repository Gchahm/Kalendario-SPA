import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCategoryInputComponent } from './service-category-input.component';

describe('ServiceCategoryInputComponent', () => {
  let component: ServiceCategoryInputComponent;
  let fixture: ComponentFixture<ServiceCategoryInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceCategoryInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCategoryInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
