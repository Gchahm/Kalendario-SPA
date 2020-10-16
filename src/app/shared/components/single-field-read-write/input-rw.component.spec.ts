import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputRwComponent } from './input-rw.component';

describe('SingleFieldReadWriteComponent', () => {
  let component: InputRwComponent;
  let fixture: ComponentFixture<InputRwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputRwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputRwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
