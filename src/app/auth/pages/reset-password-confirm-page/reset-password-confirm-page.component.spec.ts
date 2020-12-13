import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordConfirmPageComponent } from './reset-password-confirm-page.component';

describe('ResetPasswordPageComponent', () => {
  let component: ResetPasswordConfirmPageComponent;
  let fixture: ComponentFixture<ResetPasswordConfirmPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordConfirmPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordConfirmPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
