import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelListDetailsComponent } from './model-list-details.component';

describe('ModelListDetailsComponent', () => {
  let component: ModelListDetailsComponent;
  let fixture: ComponentFixture<ModelListDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelListDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
