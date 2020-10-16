import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyStripeDetailsComponent } from './company-stripe-details.component';

describe('CompanyStripeDetailsComponent', () => {
  let component: CompanyStripeDetailsComponent;
  let fixture: ComponentFixture<CompanyStripeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyStripeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyStripeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
