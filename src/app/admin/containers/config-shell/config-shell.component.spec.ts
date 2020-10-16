import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigShellComponent } from './config-shell.component';

describe('ConfigPageComponent', () => {
  let component: ConfigShellComponent;
  let fixture: ComponentFixture<ConfigShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
