import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResendConfirmationComponent } from './resend-confirmation.component';
import {AuthService} from '@shared/services/auth.service';
import {AuthServiceMock, RouterMock, ToastServiceMock} from '@shared/test/stubs';
import {ToastService} from '@shared/services/toast.service';
import {ActivatedRoute, convertToParamMap, Router} from '@angular/router';

describe('ResendConfirmationComponent', () => {
  let component: ResendConfirmationComponent;
  let fixture: ComponentFixture<ResendConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResendConfirmationComponent ],
      providers: [
        {provide: AuthService, useClass: AuthServiceMock},
        {provide: ToastService, useClass: ToastServiceMock},
        {provide: Router, useClass: RouterMock},
        { provide: ActivatedRoute, useValue: {snapshot: { paramMap: convertToParamMap({when: '/'}) }}},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResendConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
