import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {EmployeesPageComponent} from './employees-page.component';
import {AdminServiceMock} from '@admin-schedule/test/stubs';
import {MatDialog} from '@angular/material/dialog';
import {MatDialogMock} from '@shared/test/stubs';
import {NgReduxTestingModule} from '@angular-redux/store/testing';
import {AdminEmployeeService} from '@admin-schedule/services/admin-employee.service';


describe('EmployeesPageComponent', () => {
  let component: EmployeesPageComponent;
  let fixture: ComponentFixture<EmployeesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgReduxTestingModule
      ],
      declarations: [ EmployeesPageComponent ],
      providers: [
        {provide: AdminEmployeeService, useClass: AdminServiceMock},
        {provide: MatDialog, useClass: MatDialogMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
