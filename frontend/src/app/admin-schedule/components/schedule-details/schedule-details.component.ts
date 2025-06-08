import {ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {ISchedule, IScheduleWriteModel, IShift, Schedule, TimeFrame} from '@api/models';
import {MatDialog} from '@angular/material/dialog';
import {AdjustFrameTimesDialogComponent} from '@app/admin-schedule/containers/adjust-frame-times-dialog/adjust-frame-times-dialog.component';
import {ApiError} from '@api/Errors';


@Component({
  selector: 'admin-schedule-details',
  templateUrl: './schedule-details.component.html',
  styleUrls: ['./schedule-details.component.scss']
})
export class ScheduleDetailsComponent {

  hours: string[] = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00',
    '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00',
    '23:00'];

  @Input() editMode: boolean;
  private _model: ISchedule;
  private storeModel: ISchedule;

  @Input() set model(value: ISchedule) {
    this._model = Schedule.clone(value);
    this.storeModel = value;
  }

  get model(): ISchedule {
    return this._model;
  }

  @Input() apiError: ApiError;

  @Output() create = new EventEmitter<IScheduleWriteModel>();
  /** Emits when the submit button is clicked with the form value if the id of the model passed was not zero */
  @Output() update = new EventEmitter<IScheduleWriteModel>();
  /** Emits when the cancel button is clicked with true for when the model is a new model */
  @Output() cancel = new EventEmitter<boolean>();

  constructor(private dialog: MatDialog,
              private ref: ChangeDetectorRef) {
  }

  submit() {
    if (this.model.id === 0 || !this.model.id) {
      this.create.emit(Schedule.toWriteModel(this.model));
    } else {
      this.update.emit(Schedule.toWriteModel(this.model));
    }
  }

  emitCancel() {
    this.cancel.emit(this.model.id === 0);
    this.model = this.storeModel;
  }

  getShift(name: string): IShift {
    return this.model[name];
  }

  addFrame(day: string) {
    const data = {start: '09:00', end: '10:00'};
    this.dialog.open(AdjustFrameTimesDialogComponent, {width: '300px', data})
      .afterClosed()
      .toPromise()
      .then(r => {
        if (r) {
          this.model[day].frames.push(new TimeFrame(r.start, r.end));
          this.ref.detectChanges();
        }
      });
  }

  updateFrame(day: string, frame: TimeFrame) {
    if (this.editMode) {
      const data = {start: frame.start.toISOString(), end: frame.end.toISOString()};
      this.dialog.open(AdjustFrameTimesDialogComponent, {width: '300px', data})
        .afterClosed()
        .toPromise()
        .then(r => {
          if (r) {
            const shift = this.getShift(day);
            shift.frames = shift.frames.map(f => f === frame ? new TimeFrame(r.start, r.end) : f);
            this.ref.detectChanges();
          }
        });
    }
  }
}
