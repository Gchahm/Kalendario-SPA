import {Component, Input, OnInit} from '@angular/core';
import {Moment} from 'moment';
import {Employee} from '../../../core/models/Employee';
import * as moment from 'moment';
import {DateChangedEvent} from '../../../calendar/events/DateChangedEvent';
import {AppointmentService} from '../../../shared/services/appointment.service';
import {BaseAppointment} from '../../../core/models/BaseAppointment';
import {CalendarEvent} from '../../../calendar/models/CalendarEvent';
import {MatDialog} from '@angular/material';
import {AppointmentEventDialogComponent} from '../../dialogs/appointment-event/appointment-event-dialog.component';
import {CreateSelfAppointmentDialogComponent} from '../../dialogs/create-self-appointment/create-self-appointment-dialog.component';
import {CreateAppointmentDialogComponent} from '../../dialogs/create-appointment/create-appointment-dialog.component';
import {ToastService} from '../../../shared/services/toast.service';
import {Appointment} from '../../../core/models/Appointment';
import {AppointmentRequestsDialogComponent} from '../../dialogs/appointment-requests/appointment-requests-dialog.component';

@Component({
  selector: 'employee-schedule-view',
  templateUrl: './schedule-view.component.html',
  styleUrls: ['./schedule-view.component.css']
})
export class ScheduleViewComponent implements OnInit {

  @Input() set employee(employee: Employee) {
    this.emp = employee;
    if (this.date) {
      this.loadAppointments(this.date);
    }
  }
  @Input() set currentDate(date: Moment) {
    this.date = date;
    this.loadAppointments(date);
  }

  date: Moment;
  emp: Employee;
  appointments: BaseAppointment[];
  requests: Appointment[];
  events: CalendarEvent[];

  constructor(private appointmentService: AppointmentService,
              private toast: ToastService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.loadAppointments(this.date);
    this.loadRequests();
  }

  openRequests() {
    const dialogRef = this.dialog.open(AppointmentRequestsDialogComponent, {
      width: '400px',
      data: {requests: this.requests}
    });
  }

  bookSelfAppointment() {
    const dialogRef = this.dialog.open(CreateSelfAppointmentDialogComponent, {
      width: '400px'
    });
  }

  bookAppointment() {
    const dialogRef = this.dialog.open(CreateAppointmentDialogComponent, {
      width: '400px',
      data: {employee: this.emp, date: this.date}
    });

    dialogRef.afterClosed().toPromise()
      .then(createModel => {
        if (createModel) {
          this.appointmentService.createAppointment(createModel)
            .toPromise()
            .then(success => {
              this.appointments.push(success);
              this.loadEvents();
              this.toast.success('appointment booked');
            })
            .catch(error => this.toast.error(error));
        }
      });
  }

  handleDayRender($event: DateChangedEvent) {
    this.loadAppointments($event.date);
  }

  private loadAppointments(date: Moment) {
    this.date = date.clone().utc();
    const fromDate = date.clone().startOf('day');
    const toDate = date.clone().endOf('day');
    this.appointmentService.getAll({
      employee: this.emp.id.toString(),
      from_date: fromDate.toISOString(),
      to_date: toDate.toISOString(),
      status: 'A'
    })
      .toPromise().then(appointments => {
      this.appointments = appointments;
      this.loadEvents();
      this.date = date;
    });
  }

  private loadEvents() {
    const dialog = this.dialog;
    this.events = this.appointments.map(apt => this.event(apt, dialog));
  }

  private loadRequests() {
    this.appointmentService.getAppointments({employee: this.emp.id.toString(), status: 'P'})
      .toPromise()
      .then(appointments => this.requests = appointments);
  }

  private event(apt: BaseAppointment, dialog): CalendarEvent {
    const fn = () => {
      dialog.open(AppointmentEventDialogComponent, {
        width: '400px',
        data: {id: apt.id}
      });
    };
    return {
      title: apt.start.format('DD/MM/YYYY HH:mm') + ' - ' + apt.end.format('HH:mm'),
      start: apt.start,
      end: apt.end,
      onClick: fn
    };
  }
}

