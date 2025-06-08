import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyPayPreferencesDetailsComponent } from './company-pay-preferences-details.component';

describe('CompanyPayPreferencesDetailsComponent', () => {
  let component: CompanyPayPreferencesDetailsComponent;
  let fixture: ComponentFixture<CompanyPayPreferencesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyPayPreferencesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyPayPreferencesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
