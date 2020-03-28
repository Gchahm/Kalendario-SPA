import {Component} from '@angular/core';
import {ScheduleService} from '../../../services/schedule.service';
import {CreateScheduleDialogComponent} from '../../_dialogs/create-schedule/create-schedule-dialog.component';
import {BaseListComponent} from '../BaseListComponent';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '../../../../Store';
import {Schedule} from '../../../../core/models/Schedule';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.scss']
})
export class SchedulePageComponent extends BaseListComponent<Schedule> {

  @select((store: IAppState) => store.admin.schedules) modelList$;

  constructor(service: ScheduleService,
              dialog: MatDialog,
              redux: NgRedux<IAppState>) {
    super(service, dialog, CreateScheduleDialogComponent, redux);
  }
}
