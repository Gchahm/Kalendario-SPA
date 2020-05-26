import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftsPageComponent } from './shifts-page.component';
import {NgReduxTestingModule} from '@angular-redux/store/testing';
import {AdminServiceMock} from '@admin-schedule/test/stubs';
import {MatDialog} from '@angular/material/dialog';
import {MatDialogMock} from '@shared/test/stubs';
import {ShiftService} from '@admin-schedule/services/shift.service';

describe('ShiftsPageComponent', () => {
  let component: ShiftsPageComponent;
  let fixture: ComponentFixture<ShiftsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgReduxTestingModule],
      declarations: [ ShiftsPageComponent ],
      providers: [
        {provide: ShiftService, useClass: AdminServiceMock},
        {provide: MatDialog, useClass: MatDialogMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
