import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EmployeeFormComponent} from './employee-form.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MockNgRedux, NgReduxTestingModule} from '@angular-redux/store/testing';
import {MatSelectModule} from '@angular/material/select';
import {ModelViewSetClientMock} from '@api/testing';
import {EmployeeAdminClient} from '@api/clients';
import {Employee, Service} from '@api/models';

describe('EmployeeFormComponent', () => {
  let component: EmployeeFormComponent;
  let fixture: ComponentFixture<EmployeeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        NgReduxTestingModule,
      ],
      declarations: [EmployeeFormComponent],
      providers: [
        {provide: EmployeeAdminClient, useClass: ModelViewSetClientMock}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    MockNgRedux.reset();
    fixture = TestBed.createComponent(EmployeeFormComponent);
    component = fixture.componentInstance;
    const employee = new Employee();
    employee.services.push(new Service());
    component.model = employee;
    component.createForm();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
