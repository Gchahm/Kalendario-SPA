import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RequestsComponent} from './requests.component';
import {ActivatedRoute, convertToParamMap, Router} from '@angular/router';
import {RouterMock} from '@shared/test/stubs';
import {ModelViewSetClientMock} from '@api/testing';
import {AppointmentAdminClient} from '@api/clients';

describe('DashboardPageComponent', () => {
  let component: RequestsComponent;
  let fixture: ComponentFixture<RequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RequestsComponent],
      providers: [
        {provide: AppointmentAdminClient, useClass: ModelViewSetClientMock},
        {provide: ActivatedRoute, useValue: {snapshot: {paramMap: convertToParamMap({returnUrl: '/'})}}},
        {provide: Router, useClass: RouterMock}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
