import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordShellComponent } from './change-password-shell.component';

describe('ChangePasswordShellComponent', () => {
  let component: ChangePasswordShellComponent;
  let fixture: ComponentFixture<ChangePasswordShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePasswordShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
