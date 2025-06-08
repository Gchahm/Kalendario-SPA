import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordRequestPageComponent } from './reset-password-request-page.component';

describe('ResetPasswordPageComponent', () => {
  let component: ResetPasswordRequestPageComponent;
  let fixture: ComponentFixture<ResetPasswordRequestPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordRequestPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordRequestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
