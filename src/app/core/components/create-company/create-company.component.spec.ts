import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCompanyComponent } from './create-company.component';
import {FormBuilder} from '@angular/forms';
import {CompanyService} from '@shared/services/company.service';
import {DjangoRWModelServiceMock} from '@core/test/stubs';
import {AuthService} from '@shared/services/auth.service';
import {AuthServiceMock, RouterMock} from '@shared/test/stubs';
import {Router} from '@angular/router';
import {NgReduxTestingModule} from '@angular-redux/store/testing';

describe('CreateCompanyComponent', () => {
  let component: CreateCompanyComponent;
  let fixture: ComponentFixture<CreateCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgReduxTestingModule,
      ],
      declarations: [ CreateCompanyComponent ],
      providers: [
        FormBuilder,
        {provide: CompanyService, useClass: DjangoRWModelServiceMock},
        {provide: AuthService, useClass: AuthServiceMock},
        {provide: Router, useClass: RouterMock},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
