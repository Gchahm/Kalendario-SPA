import {Component} from '@angular/core';
import {ScheduleService} from '../../../services/schedule.service';
import {MatDialog} from '@angular/material';
import {CreateScheduleDialogComponent} from '../../_dialogs/create-schedule/create-schedule-dialog.component';
import {BaseListComponent} from '../BaseListComponent';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '../../../../Store';
import {Schedule} from '../../../../core/models/Schedule';

@Component({
  selector: 'app-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.css']
})
export class SchedulePageComponent extends BaseListComponent<Schedule> {

  @select((store: IAppState) => store.admin.schedules) modelList$;

  constructor(service: ScheduleService,
              dialog: MatDialog,
              redux: NgRedux<IAppState>) {
    super(service, dialog, CreateScheduleDialogComponent, redux);
  }
}
