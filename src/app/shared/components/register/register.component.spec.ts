import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RegisterComponent} from './register.component';
import {AuthService} from '@shared/services/auth.service';
import {AuthServiceMock, RouterMock, ToastServiceMock} from '@shared/test/stubs';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, convertToParamMap, Router} from '@angular/router';
import {ToastService} from '@shared/services/toast.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
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
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
