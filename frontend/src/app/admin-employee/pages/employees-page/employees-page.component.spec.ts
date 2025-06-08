import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {EmployeesPageComponent} from './employees-page.component';
import {MatDialog} from '@angular/material/dialog';
import {MatDialogMock, ToastServiceMock} from '@shared/test/stubs';
import {ModelViewSetClientMock} from '@api/testing';
import {EmployeeAdminClient} from '@api/clients';
import {ToastService} from '@shared/services/toast.service';


describe('EmployeesPageComponent', () => {
  let component: EmployeesPageComponent;
  let fixture: ComponentFixture<EmployeesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [EmployeesPageComponent],
      providers: [
        {provide: EmployeeAdminClient, useClass: ModelViewSetClientMock},
        {provide: MatDialog, useClass: MatDialogMock},
        {provide: ToastService, useClass: ToastServiceMock}
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
