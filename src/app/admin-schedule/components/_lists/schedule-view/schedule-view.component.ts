import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {select} from '@angular-redux/store';
import {MatDialog} from '@angular/material/dialog';
import {Moment} from 'moment';
import {Employee} from '@core/models/Employee';
import {Schedule} from '@core/models/Schedule';
import {Appointment} from '@core/models/Appointment';
import {CalendarEvent} from '@app/calendar/models/CalendarEvent';
import {Slot} from '@app/calendar/models/Slot';
import {IAppState} from '@app/Store';
import {AppointmentService} from '@shared/services/appointment.service';
import {AppointmentEventDialogComponent} from '@admin-schedule/components/_dialogs/appointment-event/appointment-event-dialog.component';
import {AppointmentRequestsDialogComponent} from '@admin-schedule/components/_dialogs/appointment-requests/appointment-requests-dialog.component';
import {CreateAppointmentDialogComponent} from '@admin-schedule/components/_dialogs/create-appointment/create-appointment-dialog.component';
import {ListResult} from '@admin-schedule/services/AdminModelService';

@Component({
  selector: 'employee-schedule-view',
  templateUrl: './schedule-view.component.html',
  styleUrls: ['./schedule-view.component.scss']
})
export class ScheduleViewComponent implements OnInit, OnDestroy {

  @Input() set employee(employee: Employee) {
    this.emp = employee;
    if (this.date) {
      this.loadAppointments();
    }
  }

  @Input() set currentDate(date: Moment) {
    this.date = date;
    this.loadAppointments();
  }

  @select((s: IAppState) => s.admin.schedules) schedules$: Observable<Schedule[]>;

  @Output() closeClicked = new EventEmitter<Employee>();

  sub: Subscription;
  date: Moment;
  emp: Employee;
  schedule: Schedule;
  requests: Appointment[];
  events: CalendarEvent[];
  availability: Slot[] = [];
  public modelList: Appointment[];
  protected DIALOG_WIDTH = '800px';


  public constructor(private appointmentService: AppointmentService,
                     private dialog: MatDialog) {
  }

  ngOnInit() {
    this.sub = this.schedules$.subscribe( schedules => {
      this.schedule = schedules.find(s => s.id === this.emp.schedule);
    });
    this.loadAppointments();
    this.loadRequests();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onCloseClicked() {
    this.closeClicked.emit(this.emp);
  }

  onCreateClicked(appointmentType) {
    const dialogRef = this.dialog.open(CreateAppointmentDialogComponent, {
      data: {employee: this.emp, date: this.date, type: appointmentType},
      width: this.DIALOG_WIDTH,
    });

    dialogRef.afterClosed().toPromise()
      .then(event => {
        if (event) {
          this.loadAppointments();
        }
      });
  }

  openRequests() {
    this.dialog.open(AppointmentRequestsDialogComponent, {
      width: '400px',
      data: {requests: this.requests}
    });
  }

  bookSelfAppointment() {
    this.onCreateClicked('SELF');
  }

  bookAppointment() {
    this.onCreateClicked('SERVICE');
  }

  editAppointment(apt: Appointment) {
    const dialogRef = this.dialog.open(AppointmentEventDialogComponent, {
      width: '400px',
      data: {appointment: apt}
    });

    dialogRef.afterClosed().toPromise()
      .then((appointment: Appointment) => {
        if (appointment) {
          this.loadAppointments();
        }
      });
  }

  private loadRequests() {
    this.appointmentService.get({employee: this.emp.id.toString(), status: 'P'})
      .toPromise()
      .then(result => this.requests = result.results);
  }

  public loadAppointments() {
    const params = {
      employee: this.emp.id.toString(),
      from_date: this.date.startOf('day').toISOString(),
      to_date: this.date.endOf('day').toISOString(),
      status: 'A'
    };


    this.appointmentService.get(params)
      .toPromise()
      .then((result: ListResult<Appointment>) => {
        this.availability = this.schedule.getShift(this.date).frames.map(f => {
          return {start: f.start, end: f.end};
        });
        this.modelList = result.results;
        this.events = this.modelList.map(apt => this.event(apt));
      });
  }

  private event(apt: Appointment): CalendarEvent {
    const fn = () => {
      this.editAppointment(apt);
    };
    return {
      // title: apt.start.format('DD/MM/YYYY HH:mm') + ' - ' + apt.end.format('HH:mm'),
      title: apt.customer.firstName + ' - ' + apt.service.name,
      color: apt.service.color,
      start: apt.start,
      end: apt.end,
      onClick: fn
    };
  }
}

