import {Component, OnDestroy, OnInit} from '@angular/core';
import {EmployeeService} from '../../../shared/services/employee.service';
import {ToastService} from '../../../shared/services/toast.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AppointmentService} from '../../../shared/services/appointment.service';
import {Employee} from '../../../core/models/Employee';
import {Moment} from 'moment';
import {Service} from '../../../core/models/Service';
import {Person} from '../../../core/models/Person';
import * as moment from 'moment';
import {CreateAppointmentModel} from '../../../core/models/Appointment';
import {Globals} from '../../../core/services/Globals';

@Component({
  selector: 'customer-book-appointment-page',
  templateUrl: './book-appointment-page.component.html',
  styleUrls: ['./book-appointment-page.component.css']
})
export class BookAppointmentPageComponent implements OnInit, OnDestroy {


  empServiceSubscription: Subscription;
  queryParamSubscription: Subscription;
  appointment: AppointmentForm = new AppointmentForm();

  constructor(private empService: EmployeeService,
              private appointmentService: AppointmentService,
              private globals: Globals,
              private alertify: ToastService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.queryParamSubscription = this.route.paramMap.subscribe(params => {
      this.appointment.start = moment.utc(params.get('date'));
      this.empService.get(params.get('employee')).subscribe((emp) => {
        this.appointment.employee = emp;
        this.appointment.service = emp.services.find(s => s.id === +params.get('service'));
      });
    });
  }

  ngOnDestroy(): void {
    this.queryParamSubscription.unsubscribe();
    this.empServiceSubscription.unsubscribe();
  }

  bookAppointment() {
    this.appointment.customer = this.globals.user.person;
    this.appointmentService.createAppointment(this.appointment.model())
      .toPromise()
      .then(res => this.alertify.success('appointment booked'))
      .catch(error => this.alertify.error(error))
      .finally(() => this.router.navigate(['/my-appointments']));
  }
}

class AppointmentForm {
  employee: Employee;
  start: Moment;
  service: Service;
  customer: Person;
  customerNotes: string;

  model(): CreateAppointmentModel {
    return {
      employee: this.employee.id,
      customer: (!!this.customer ? this.customer.id : null),
      service: this.service.id,
      start: this.start.toISOString(),
      customer_notes: this.customerNotes,
      status: 'P'
    };
  }
}
