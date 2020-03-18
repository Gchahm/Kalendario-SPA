import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelListContainerComponent } from './model-list-container.component';

describe('ModelListContainerComponent', () => {
  let component: ModelListContainerComponent;
  let fixture: ComponentFixture<ModelListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
