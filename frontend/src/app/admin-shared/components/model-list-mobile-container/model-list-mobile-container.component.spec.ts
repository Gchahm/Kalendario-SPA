import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelListMobileContainerComponent } from './model-list-mobile-container.component';

describe('ModelListMobileContainerComponent', () => {
  let component: ModelListMobileContainerComponent;
  let fixture: ComponentFixture<ModelListMobileContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelListMobileContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelListMobileContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
