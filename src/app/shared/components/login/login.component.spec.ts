import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {AuthService} from '@api/clients/auth.service';
import {AuthServiceMock, RouterMock, ToastServiceMock} from '@shared/test/stubs';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, convertToParamMap, Router} from '@angular/router';
import {ToastService} from '@shared/services/toast.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        FormBuilder,
        {provide: AuthService, useClass: AuthServiceMock},
        {provide: Router, useClass: RouterMock},
        {provide: ToastService, useClass: ToastServiceMock},
        {provide: ActivatedRoute, useValue: {snapshot: {paramMap: convertToParamMap({id: ''})}}},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
