import {Component, Input, OnInit} from '@angular/core';
import {Moment} from 'moment';
import {Employee} from '../../../../core/models/Employee';
import {CalendarEvent} from '../../../../calendar/models/CalendarEvent';
import {MatDialog} from '@angular/material';
import {AppointmentEventDialogComponent} from '../../_dialogs/appointment-event/appointment-event-dialog.component';
import {ToastService} from '../../../../shared/services/toast.service';
import {Appointment} from '../../../../core/models/Appointment';
import {AppointmentRequestsDialogComponent} from '../../_dialogs/appointment-requests/appointment-requests-dialog.component';
import {AppointmentService} from '../../../../shared/services/appointment.service';
import {CreateAppointmentDialogComponent} from '../../_dialogs/create-appointment/create-appointment-dialog.component';

@Component({
  selector: 'employee-schedule-view',
  templateUrl: './schedule-view.component.html',
  styleUrls: ['./schedule-view.component.css']
})
export class ScheduleViewComponent implements OnInit {

  @Input() set employee(employee: Employee) {
    this.emp = employee;
    if (this.date) {
      this.loadModels();
    }
  }

  @Input() set currentDate(date: Moment) {
    this.date = date;
    this.loadModels();
  }

  date: Moment;
  emp: Employee;
  requests: Appointment[];
  events: CalendarEvent[];
  public modelList: Appointment[];
  protected DIALOG_WIDTH = '800px';
  public editMode = false;


  public constructor(private appointmentService: AppointmentService,
                     private dialog: MatDialog,
                     private toast: ToastService) {
  }

  ngOnInit() {
    this.loadModels();
    this.loadRequests();
  }

  handleModelEvent(event) {
    switch (event.action) {
      case 'PATCH':
        this.runFunction(this.appointmentService.patch(event.model.id, event.model), 'updated');
        break;
      case 'DELETE':
        this.runFunction(this.appointmentService.delete(event.model.id), 'deleted');
        break;
      case 'CREATE':
        this.runFunction(this.appointmentService.post(event.model), 'created');
        break;
    }
  }

  runFunction(func, successMessage) {
    func.toPromise().then(() => {
      this.loadModels();
      this.toast.success(successMessage);
    }).catch(err => {
      this.toast.error(err);
    });
  }

  onCreateClicked(appointmentType) {
    const dialogRef = this.dialog.open(CreateAppointmentDialogComponent, {
      data: {employee: this.emp, date: this.date, type: appointmentType},
      width: this.DIALOG_WIDTH,
    });

    dialogRef.afterClosed().toPromise()
      .then(event => {
        if (event) {
          this.handleModelEvent(event);
        }
      });
  }

  openRequests() {
    const dialogRef = this.dialog.open(AppointmentRequestsDialogComponent, {
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
      .then(event => {
        if (event) {
          this.handleModelEvent(event);
        }
      });
  }

  private loadRequests() {
    this.appointmentService.get({employee: this.emp.id.toString(), status: 'P'})
      .toPromise()
      .then(appointments => this.requests = appointments);
  }

  public loadModels() {
    const params = {
      employee: this.emp.id.toString(),
      from_date: this.date.startOf('day').toISOString(),
      to_date: this.date.endOf('day').toISOString(),
      status: 'A'
    };

    this.appointmentService.get(params)
      .toPromise().then(appointments => {
      this.modelList = appointments;
      this.events = this.modelList.map(apt => this.event(apt));
    });
  }

  private event(apt: Appointment): CalendarEvent {
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
}

