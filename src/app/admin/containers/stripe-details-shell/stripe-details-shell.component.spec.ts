import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StripeDetailsShellComponent } from './stripe-details-shell.component';

describe('PaymentsPageComponent', () => {
  let component: StripeDetailsShellComponent;
  let fixture: ComponentFixture<StripeDetailsShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StripeDetailsShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StripeDetailsShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
