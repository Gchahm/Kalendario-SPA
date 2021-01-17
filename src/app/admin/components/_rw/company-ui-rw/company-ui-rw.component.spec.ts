import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyUiRwComponent } from './company-ui-rw.component';
import {CompanyConfig} from '@api/models';

describe('CompanyUiRwComponent', () => {
  let component: CompanyUiRwComponent;
  let fixture: ComponentFixture<CompanyUiRwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyUiRwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyUiRwComponent);
    component = fixture.componentInstance;
    component.model = CompanyConfig.fromJs({});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
