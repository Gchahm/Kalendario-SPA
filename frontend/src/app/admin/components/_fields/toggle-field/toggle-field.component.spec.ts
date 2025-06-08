import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleFieldComponent } from './toggle-field.component';

describe('ToggleFieldComponent', () => {
  let component: ToggleFieldComponent;
  let fixture: ComponentFixture<ToggleFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToggleFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
