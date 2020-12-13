import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordConfirmFormComponent } from './reset-password-confirm-form.component';

describe('ResetPasswordFormComponent', () => {
  let component: ResetPasswordConfirmFormComponent;
  let fixture: ComponentFixture<ResetPasswordConfirmFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordConfirmFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordConfirmFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
