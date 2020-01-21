import {Component, OnDestroy, OnInit} from '@angular/core';
import {IScheduleReadModel} from '../../../core/models/Schedule';
import {ListComponent} from '../../../core/generics/components/ListComponent';
import {ScheduleService} from '../../services/schedule.service';
import {MatDialog} from '@angular/material';
import {ToastService} from '../../../shared/services/toast.service';
import {CreateScheduleDialogComponent} from '../../dialogs/create-schedule/create-schedule-dialog.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.css']
})
export class SchedulePageComponent extends ListComponent<IScheduleReadModel> implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor(service: ScheduleService,
              dialog: MatDialog,
              toast: ToastService) {
    super(service, dialog, CreateScheduleDialogComponent, toast);
  }

  protected DIALOG_WIDTH = '1200px';

  dialogData(): object {
    return undefined;
  }

  ngOnInit() {
    this.subscription = this.modelService.get()
      .subscribe((shifts) => this.loadModels(shifts));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }



}
