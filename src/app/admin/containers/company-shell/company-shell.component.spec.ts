import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyShellComponent } from './company-shell.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {CanBookAppointmentsGuard} from '@admin/guards/can-book-appointments.guard';
import {User} from '@api/models';
import * as fromCompany from '@admin/state/company';

describe('CompanyShellComponent', () => {
  let component: CompanyShellComponent;
  let fixture: ComponentFixture<CompanyShellComponent>;
  const initialState = { [fromCompany.storeName]: fromCompany.initialState };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyShellComponent ],
      providers: [
        provideMockStore({initialState}),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
