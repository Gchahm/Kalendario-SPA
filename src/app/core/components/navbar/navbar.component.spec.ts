import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NavbarComponent} from './navbar.component';
import {AuthService} from '@api/clients/auth.service';
import {AuthServiceMock, RouterMock, ToastServiceMock} from '@shared/test/stubs';
import {ToastService} from '@shared/services/toast.service';
import {Router} from '@angular/router';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [NavbarComponent],
      providers: [
        {provide: AuthService, useClass: AuthServiceMock},
        {provide: ToastService, useClass: ToastServiceMock},
        {provide: Router, useClass: RouterMock},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
