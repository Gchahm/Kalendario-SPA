import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {AuthService} from '@api/clients/auth.service';
import {AuthServiceMock, RouterMock, ToastServiceMock} from '@shared/test/stubs';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {ToastService} from '@shared/services/toast.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      providers: [
        {provide: AuthService, useClass: AuthServiceMock},
        {provide: Router, useClass: RouterMock},
        {provide: ToastService, useClass: ToastServiceMock},
        FormBuilder,

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
