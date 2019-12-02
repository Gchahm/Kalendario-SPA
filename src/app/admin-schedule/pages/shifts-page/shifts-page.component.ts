import { Component, OnInit } from '@angular/core';
import {ListComponent} from '../../../core/generics/components/ListComponent';
import {Shift} from '../../../core/models/Shift';
import {Globals} from '../../../core/services/Globals';
import {ToastService} from '../../../shared/services/toast.service';
import {MatDialog} from '@angular/material';
import {ShiftService} from '../../services/shift.service';
import {CreateShiftDialogComponent} from '../../dialogs/create-shift/create-shift-dialog.component';

@Component({
  selector: 'app-shift-page',
  templateUrl: './shifts-page.component.html',
  styleUrls: ['./shifts-page.component.css']
})
export class ShiftsPageComponent extends ListComponent<Shift> implements OnInit {

  constructor(private shiftService: ShiftService,
              public globals: Globals,
              toast: ToastService,
              dialog: MatDialog) {
    super(shiftService, dialog, CreateShiftDialogComponent, toast);
  }

  ngOnInit() {
  }

  dialogData(): object {
    return undefined;
  }

}
