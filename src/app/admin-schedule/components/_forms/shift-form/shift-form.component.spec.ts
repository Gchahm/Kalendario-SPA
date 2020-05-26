import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ShiftFormComponent} from './shift-form.component';
import {AdminServiceMock} from '../../../test/stubs';
import {ShiftService} from '../../../services/shift.service';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {Shift} from '@core/models/Shift';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('ShiftFormComponent', () => {
  let component: ShiftFormComponent;
  let fixture: ComponentFixture<ShiftFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
      ],
      declarations: [
        ShiftFormComponent
      ],
      providers: [
        {provide: ShiftService, useClass: AdminServiceMock},
        FormBuilder,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftFormComponent);
    component = fixture.componentInstance;
    component.model = new Shift();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
