import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {Appointment} from '../../../core/models/Appointment';
import {ToastService} from '../../../shared/services/toast.service';
import {CancelModalComponent} from '../../components/cancel-modal/cancel-modal.component';
import {Moment} from 'moment';
import {BaseAppointment} from '../../../core/models/BaseAppointment';
import {SelfAppointment} from '../../models/SelfAppointment';
import {AppointmentService} from '../../../shared/services/appointment.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {CreateCustomer} from '../../../shared/services/customer.service';

@Component({
  selector: 'employee-appointment-event',
  templateUrl: './appointment-event-dialog.component.html',
  styleUrls: ['./appointment-event-dialog.component.css']
})
export class AppointmentEventDialogComponent implements OnInit {

  @Input() showDate = false;
  @Input() showButtons = false;

  @Output() eventClicked = new EventEmitter<Moment>();

  appointment: Appointment;
  selfAppointment: SelfAppointment;

  constructor(private appointmentsService: AppointmentService,
              public dialogRef: MatDialogRef<AppointmentEventDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { id: string }) {
  }

  //
  // constructor(,
  //             private toastr: ToastService,
  //             public dialog: MatDialog) {
  // }

  ngOnInit() {
    this.appointmentsService.getAppointment(this.data.id)
      .toPromise()
      .then(baseAppointment => {
        if (baseAppointment instanceof Appointment) {
          this.appointment = baseAppointment;
        }
        if (baseAppointment instanceof SelfAppointment) {
          this.selfAppointment = baseAppointment;
        }
      });
  }

  emitEventClicked() {
    this.eventClicked.emit(this.appointment.start.clone());
  }

  //
  // changeStatus(status: string) {
  //   const dialogRef = this.dialog.open(CancelModalComponent, {
  //     width: '250px',
  //     data: {type: (status === 'A' ? 'confirm' : 'cancel')}
  //   });
  //
  //   dialogRef.afterClosed().subscribe(res => {
  //       if (res) {
  //         this.updateStatus(status);
  //       }
  //     });
  // }

  // private updateStatus(status: string) {
  //   this.appointment.status = status;
  //   this.appointmentsService.updateAppointment(this.appointment)
  //     .toPromise()
  //     .then(appointment => {
  //       this.toastr.success('appointment updated');
  //       this.appointment = appointment;
  //       this.emitEventClicked();
  //     });
  // }
}
