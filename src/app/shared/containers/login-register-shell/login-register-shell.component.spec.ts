import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegisterShellComponent } from './login-register-shell.component';

describe('LoginRegisterShellComponent', () => {
  let component: LoginRegisterShellComponent;
  let fixture: ComponentFixture<LoginRegisterShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginRegisterShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRegisterShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
