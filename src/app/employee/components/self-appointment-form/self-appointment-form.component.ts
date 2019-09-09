import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Employee} from '../../../shared/models/Employee';
import {Moment} from 'moment';
import {EmployeeAppointmentService} from '../../services/employee-appointment.service';
import {ToastService} from '../../../shared/services/toast.service';
import {CreateSelfAppointmentForm} from '../../models/CreateSelfAppointment';

@Component({
  selector: 'app-self-appointment-form',
  templateUrl: './self-appointment-form.component.html',
  styleUrls: ['./self-appointment-form.component.css']
})
export class SelfAppointmentFormComponent implements OnInit {

  @Input() employee: Employee;
  @Input() set date(value: Moment) {
    this.form.startDate = value.format('YYYY-MM-DD');
    this.form.endDate = value.format('YYYY-MM-DD');
  }

  @Output() dateChanged = new EventEmitter<Moment>();

  form: CreateSelfAppointmentForm;

  constructor(private employeeAppointment: EmployeeAppointmentService,
              private toast: ToastService) {
    this.form = new CreateSelfAppointmentForm( '', '', '', '', '');
  }

  ngOnInit() {
  }

  submit() {
    this.employeeAppointment.createSelfAppointment(this.form.model())
      .toPromise()
      .then(success => {
        this.dateChanged.emit(success.start);
        this.toast.success('appointment booked');
      })
      .catch(error => this.toast.error(error));
  }

}
