import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StripeDetailsShellComponent } from './stripe-details-shell.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import * as fromCompany from '@admin/state/company';

describe('StripeDetailsShellComponent', () => {
  let component: StripeDetailsShellComponent;
  let fixture: ComponentFixture<StripeDetailsShellComponent>;
  let store: MockStore;
  const initialState = { [fromCompany.storeName]: fromCompany.initialState };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StripeDetailsShellComponent ],
      providers: [
        provideMockStore({initialState}),
      ]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
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
