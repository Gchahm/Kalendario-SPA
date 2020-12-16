import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelListItemsComponent } from './model-list-items.component';

describe('ModelListItemsComponent', () => {
  let component: ModelListItemsComponent;
  let fixture: ComponentFixture<ModelListItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelListItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelListItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
