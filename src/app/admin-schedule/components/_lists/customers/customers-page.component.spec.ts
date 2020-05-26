import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomersPageComponent } from './customers-page.component';
import {CustomerService} from '@admin-schedule/services/customer.service';
import {AdminServiceMock} from '@admin-schedule/test/stubs';
import {MatDialog} from '@angular/material/dialog';
import {MatDialogMock} from '@shared/test/stubs';
import {NgReduxTestingModule} from '@angular-redux/store/testing';

describe('CustomersPageComponent', () => {
  let component: CustomersPageComponent;
  let fixture: ComponentFixture<CustomersPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgReduxTestingModule
      ],
      declarations: [ CustomersPageComponent ],
      providers: [
        {provide: CustomerService, useClass: AdminServiceMock},
        {provide: MatDialog, useClass: MatDialogMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
