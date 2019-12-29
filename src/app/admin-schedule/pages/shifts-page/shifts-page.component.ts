import {Component, OnDestroy, OnInit} from '@angular/core';
import {ListComponent} from '../../../core/generics/components/ListComponent';
import {IShiftReadModel, Shift} from '../../../core/models/Shift';
import {Globals} from '../../../core/services/Globals';
import {ToastService} from '../../../shared/services/toast.service';
import {MatDialog} from '@angular/material';
import {ShiftService} from '../../services/shift.service';
import {CreateShiftDialogComponent} from '../../dialogs/create-shift/create-shift-dialog.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shift-page',
  templateUrl: './shifts-page.component.html',
  styleUrls: ['./shifts-page.component.css']
})
export class ShiftsPageComponent extends ListComponent<IShiftReadModel> implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor(private shiftService: ShiftService,
              public globals: Globals,
              toast: ToastService,
              dialog: MatDialog) {
    super(shiftService, dialog, CreateShiftDialogComponent, toast);
  }

  ngOnInit() {
    this.subscription = this.modelService.get()
      .subscribe((shifts) => this.loadModels(shifts));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  dialogData(): object {
    return undefined;
  }
}
