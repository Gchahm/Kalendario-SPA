import {Component} from '@angular/core';
import {ShiftService} from '../../../services/shift.service';
import {CreateShiftDialogComponent} from '../../_dialogs/create-shift/create-shift-dialog.component';
import {BaseListComponent} from '../BaseListComponent';
import {Shift} from '../../../../core/models/Shift';
import {IAppState} from '../../../../Store';
import {NgRedux, select} from '@angular-redux/store';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-shift-page',
  templateUrl: './shifts-page.component.html',
  styleUrls: ['./shifts-page.component.scss']
})
export class ShiftsPageComponent extends BaseListComponent<Shift> {

  @select((store: IAppState) => store.admin.shifts) modelList$;

  constructor(service: ShiftService,
              dialog: MatDialog,
              redux: NgRedux<IAppState>) {
    super(service, dialog, CreateShiftDialogComponent, redux);
  }
}
