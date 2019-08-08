import {Component, OnDestroy, OnInit} from '@angular/core';
import {Employee} from '../../models/Employee';
import {Service} from '../../models/Service';
import {EmployeeService} from '../../services/employee.service';
import {AppointmentService} from '../../services/appointment.service';
import {AlertifyService} from '../../services/alertify.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Moment} from 'moment';
import * as moment from 'moment';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit, OnDestroy {

  date: Moment;
  employee: Employee;
  service: Service;

  empServiceSubscription: Subscription;
  queryParamSubscription: Subscription;
  appointmentSubscription: Subscription;

  constructor(private empService: EmployeeService,
              private appointmentService: AppointmentService,
              private userService: UserService,
              private alertify: AlertifyService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.queryParamSubscription = this.route.paramMap.subscribe(params => {
      const id = params.get('employee');
      const serviceId = +params.get('service');
      this.date = moment.utc(params.get('date'));
      this.empServiceSubscription = this.empService.get(id).subscribe(emp => {
          this.service = emp.services.find(s => s.id === serviceId);
          this.employee = emp;
      });
    });

  }

  ngOnDestroy(): void {
    this.queryParamSubscription.unsubscribe();
    this.empServiceSubscription.unsubscribe();
    if (this.appointmentSubscription) {
      this.appointmentSubscription.unsubscribe();
    }
  }

  bookAppointment() {
    this.appointmentSubscription = this.appointmentService
      .create(this.employee.id, this.userService.getCurrentUser().id, this.service.id, this.date)
      .subscribe(res => this.alertify.success('appointment booked'),
        error => this.alertify.error(error),
        () => this.router.navigate(['/my-appointments']));
  }
}
