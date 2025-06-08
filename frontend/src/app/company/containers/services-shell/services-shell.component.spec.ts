import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesShellComponent } from './services-shell.component';

describe('ServicesShellComponent', () => {
  let component: ServicesShellComponent;
  let fixture: ComponentFixture<ServicesShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
