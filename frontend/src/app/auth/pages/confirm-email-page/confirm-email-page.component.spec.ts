import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfirmEmailPageComponent} from './confirm-email-page.component';
import {AuthService} from '@api/clients/auth.service';
import {AuthServiceMock, ToastServiceMock} from '@shared/test/stubs';
import {ToastService} from '@shared/services/toast.service';
import {ActivatedRoute, convertToParamMap} from '@angular/router';

describe('ConfirmEmailComponent', () => {
  let component: ConfirmEmailPageComponent;
  let fixture: ComponentFixture<ConfirmEmailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConfirmEmailPageComponent
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
    fixture = TestBed.createComponent(ConfirmEmailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
