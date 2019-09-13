import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Appointment} from '../../../shared/models/Appointment';
import {EmployeeAppointmentService} from '../../services/employee-appointment.service';
import {ToastService} from '../../../shared/services/toast.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CancelModalComponent} from '../cancel-modal/cancel-modal.component';
import {Moment} from 'moment';
import {BaseAppointment} from '../../../shared/models/BaseAppointment';
import {SelfAppointment} from '../../models/SelfAppointment';

@Component({
  selector: 'employee-appointment-event',
  templateUrl: './appointment-event.component.html',
  styleUrls: ['./appointment-event.component.css']
})
export class AppointmentEventComponent implements OnInit {

  @Input('appointment') baseAppointment: BaseAppointment;
  @Input() showDate = false;

  @Output() eventClicked = new EventEmitter<Moment>();

  appointment: Appointment;
  selfAppointment: SelfAppointment;

  constructor(private appointmentsService: EmployeeAppointmentService,
              private toastr: ToastService,
              private modalService: NgbModal) {
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
    const modalRef = this.modalService.open(CancelModalComponent);
    modalRef.result.then(res => {
      if (res) {
        this.updateStatus(status);
      }
    })
      .catch(error => this.toastr.message('action canceled'));
  }

  private updateStatus(status: string) {
    // this.appointment.status = status;
    // this.appointmentsService.update(this.appointment)
    //   .toPromise()
    //   .then(appointment => {
    //     this.toastr.success('appointment updated');
    //     this.appointment = appointment;
    //     this.emitEventClicked();
    //   });
  }
}
