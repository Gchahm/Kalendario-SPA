import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPageComponent } from './dashboard-page.component';
import {AppointmentService} from '@shared/services/appointment.service';
import {DjangoRWModelServiceMock} from '@core/test/stubs';
import {ActivatedRoute, convertToParamMap, Router} from '@angular/router';
import {RouterMock} from '@shared/test/stubs';

describe('DashboardPageComponent', () => {
  let component: DashboardPageComponent;
  let fixture: ComponentFixture<DashboardPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardPageComponent ],
      providers: [
        {provide: AppointmentService, useClass: DjangoRWModelServiceMock},
        { provide: ActivatedRoute, useValue: {snapshot: { paramMap: convertToParamMap({returnUrl: '/'}) }}},
        {provide: Router, useClass: RouterMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
