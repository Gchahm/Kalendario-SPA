import {Component, Input, OnInit} from '@angular/core';
import {Moment} from 'moment';
import {Employee} from '../../../core/models/Employee';
import {IBaseAppointmentRead} from '../../../core/models/IBaseAppointmentRead';
import {CalendarEvent} from '../../../calendar/models/CalendarEvent';
import {MatDialog} from '@angular/material';
import {AppointmentEventDialogComponent} from '../../dialogs/appointment-event/appointment-event-dialog.component';
import {CreateSelfAppointmentDialogComponent} from '../../dialogs/create-self-appointment/create-self-appointment-dialog.component';
import {CreateAppointmentDialogComponent} from '../../dialogs/create-appointment/create-appointment-dialog.component';
import {ToastService} from '../../../shared/services/toast.service';
import {Appointment, IAppointmentReadModel} from '../../../core/models/Appointment';
import {AppointmentRequestsDialogComponent} from '../../dialogs/appointment-requests/appointment-requests-dialog.component';
import {BaseAppointmentService} from '../../../shared/services/base-appointment.service';
import {UpdateModelEvent} from '../../../core/generics/components/UpdateModelEvent';
import {ListComponent} from '../../../core/generics/components/ListComponent';
import {SelfAppointment} from '../../models/SelfAppointment';

@Component({
  selector: 'employee-schedule-view',
  templateUrl: './schedule-view.component.html',
  styleUrls: ['./schedule-view.component.css']
})
export class ScheduleViewComponent extends ListComponent<IBaseAppointmentRead> implements OnInit {

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

  date: Moment;
  emp: Employee;
  requests: IAppointmentReadModel[];
  events: CalendarEvent[];

  constructor(public baseAptService: BaseAppointmentService,
              toast: ToastService,
              dialog: MatDialog) {
    super(baseAptService.aptService, dialog, CreateSelfAppointmentDialogComponent, toast);
  }

  ngOnInit() {
    this.loadAppointments();
    this.loadRequests();
  }

  openRequests() {
    const dialogRef = this.dialog.open(AppointmentRequestsDialogComponent, {
      width: '400px',
      data: {requests: this.requests}
    });
  }

  bookSelfAppointment() {
    this.componentType = CreateSelfAppointmentDialogComponent;
    this.modelService = this.baseAptService.selfAptService;
    this.createModel();
  }

  bookAppointment() {
    this.componentType = CreateAppointmentDialogComponent;
    this.modelService = this.baseAptService.aptService;
    this.createModel();
  }

  editAppointment(apt: IBaseAppointmentRead) {
    if (apt instanceof Appointment) {
      this.modelService = this.baseAptService.aptService;
    }
    if (apt instanceof SelfAppointment) {
      this.modelService = this.baseAptService.selfAptService;
    }
    const dialogRef = this.dialog.open(AppointmentEventDialogComponent, {
      width: '400px',
      data: {appointment: apt}
    });
    const sub = dialogRef.componentInstance.onUpdate.subscribe((event: UpdateModelEvent) => {
      this.handleUpdateModelEvent(event);
    });
    dialogRef.afterClosed().toPromise().then(r => sub.unsubscribe());
  }

  afterPatchEvent(model) {
    this.loadAppointments();
  }

  afterCreateEvent(model) {
    this.loadAppointments();
  }

  afterDeleteEvent(id) {
    this.loadAppointments();
  }

  private loadRequests() {
    this.baseAptService.aptService.get({employee: this.emp.id.toString(), status: 'P'})
      .toPromise()
      .then(appointments => this.requests = appointments);
  }

  private loadAppointments() {
    const params = {
      employee: this.emp.id.toString(),
      from_date: this.date.startOf('day').toISOString(),
      to_date: this.date.endOf('day').toISOString(),
      status: 'A'
    };

    this.baseAptService.get(params)
      .toPromise().then(appointments => {
      this.modelList = appointments;
      this.events = this.modelList.map(apt => this.event(apt));
    });
  }

  private event(apt: IBaseAppointmentRead): CalendarEvent {
    const fn = () => {
      this.editAppointment(apt);
    };
    return {
      title: apt.start.format('DD/MM/YYYY HH:mm') + ' - ' + apt.end.format('HH:mm'),
      start: apt.start,
      end: apt.end,
      onClick: fn
    };
  }

  dialogData(): object {
    return {employee: this.emp, date: this.date};
  }
}

