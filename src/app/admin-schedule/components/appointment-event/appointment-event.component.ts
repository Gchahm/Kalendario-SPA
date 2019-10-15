import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Appointment} from '../../../core/models/Appointment';
import {ToastService} from '../../../shared/services/toast.service';
import {CancelModalComponent} from '../cancel-modal/cancel-modal.component';
import {Moment} from 'moment';
import {BaseAppointment} from '../../../core/models/BaseAppointment';
import {SelfAppointment} from '../../models/SelfAppointment';
import {AppointmentService} from '../../../shared/services/appointment.service';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'employee-appointment-event',
  templateUrl: './appointment-event.component.html',
  styleUrls: ['./appointment-event.component.css']
})
export class AppointmentEventComponent implements OnInit {

  @Input('appointment') baseAppointment: BaseAppointment;
  @Input() showDate = false;
  @Input() showButtons = false;

  @Output() eventClicked = new EventEmitter<Moment>();

  appointment: Appointment;
  selfAppointment: SelfAppointment;

  constructor(private appointmentsService: AppointmentService,
              private toastr: ToastService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    if (this.baseAppointment instanceof Appointment) {
      this.appointment = this.baseAppointment;
    }
    if (this.baseAppointment instanceof SelfAppointment) {
      this.selfAppointment = this.baseAppointment;
    }
  }

  emitEventClicked() {
    this.eventClicked.emit(this.appointment.start.clone());
  }

  changeStatus(status: string) {
    const dialogRef = this.dialog.open(CancelModalComponent, {
      width: '250px',
      data: {type: (status === 'A' ? 'confirm' : 'cancel')}
    });

    dialogRef.afterClosed().subscribe(res => {
        if (res) {
          this.updateStatus(status);
        }
      });
  }

  private updateStatus(status: string) {
    this.appointment.status = status;
    this.appointmentsService.updateAppointment(this.appointment)
      .toPromise()
      .then(appointment => {
        this.toastr.success('appointment updated');
        this.appointment = appointment;
        this.emitEventClicked();
      });
  }
}
