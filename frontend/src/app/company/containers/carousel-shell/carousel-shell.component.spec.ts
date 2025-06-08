import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselShellComponent } from './carousel-shell.component';

describe('CarouselShellComponent', () => {
  let component: CarouselShellComponent;
  let fixture: ComponentFixture<CarouselShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
