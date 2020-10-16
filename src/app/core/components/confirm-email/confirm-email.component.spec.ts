import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfirmEmailComponent} from './confirm-email.component';
import {AuthService} from '@shared/services/auth.service';
import {AuthServiceMock, ToastServiceMock} from '@shared/test/stubs';
import {ToastService} from '@shared/services/toast.service';
import {ActivatedRoute, convertToParamMap} from '@angular/router';

describe('ConfirmEmailComponent', () => {
  let component: ConfirmEmailComponent;
  let fixture: ComponentFixture<ConfirmEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConfirmEmailComponent
      ],
      providers: [
        {provide: AuthService, useClass: AuthServiceMock},
        {provide: ToastService, useClass: ToastServiceMock},
        {provide: ActivatedRoute, useValue: {snapshot: {paramMap: convertToParamMap({returnUrl: '/'})}}},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
