import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import {AuthService} from '@shared/services/auth.service';
import {AuthServiceMock, RouterMock, ToastServiceMock} from '@shared/test/stubs';
import {ToastService} from '@shared/services/toast.service';
import {Router} from '@angular/router';
import {NgReduxTestingModule} from '@angular-redux/store/testing';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgReduxTestingModule,
      ],
      declarations: [ NavbarComponent ],
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
