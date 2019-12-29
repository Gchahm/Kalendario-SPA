import {Component, OnDestroy, OnInit} from '@angular/core';
import {EmployeeService} from '../../../shared/services/employee.service';
import {ToastService} from '../../../shared/services/toast.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AppointmentService} from '../../../shared/services/appointment.service';
import * as moment from 'moment';
import {Globals} from '../../../core/services/Globals';
import {Appointment} from '../../../core/models/Appointment';

@Component({
  selector: 'customer-book-appointment-page',
  templateUrl: './book-appointment-page.component.html',
  styleUrls: ['./book-appointment-page.component.css']
})
export class BookAppointmentPageComponent implements OnInit, OnDestroy {


  empServiceSubscription: Subscription;
  queryParamSubscription: Subscription;
  appointment: Appointment = new Appointment();

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
      this.empServiceSubscription = this.empService.get(params.get('employee')).subscribe((emp) => {
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
    const model = this.appointment.writeModel();
    model.customer = this.globals.user.person.id.toString();
    this.appointmentService.post(model)
      .toPromise()
      .then(res => this.alertify.success('appointment booked'))
      .catch(error => this.alertify.error(error))
      .finally(() => this.router.navigate(['/my-appointments']));
  }
}
