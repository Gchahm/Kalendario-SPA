import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToastService} from '@shared/services/toast.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AppointmentService} from '@shared/services/appointment.service';
import * as moment from 'moment';
import {Appointment} from '@core/models/Appointment';
import {IAppState} from '@app/Store';
import {EmployeeService} from '@app/company/services/employee.service';
import {concatMap} from 'rxjs/operators';

@Component({
  selector: 'customer-book-appointment-page',
  templateUrl: './book-appointment-page.component.html',
  styleUrls: ['./book-appointment-page.component.scss']
})
export class BookAppointmentPageComponent implements OnInit, OnDestroy {


  subscription: Subscription;
  appointment: Appointment = new Appointment();

  @select((s: IAppState) => s.company.companyName) companyName$;

  constructor(private empService: EmployeeService,
              private appointmentService: AppointmentService,
              private toast: ToastService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    let serviceId;
    this.subscription = this.route.paramMap
      .pipe(
        concatMap(params => {
          serviceId = +params.get('service');
          this.appointment.start = moment.utc(params.get('date'));
          return this.empService.detail(+params.get('employee'));
        })
      ).subscribe((emp) => {
      this.appointment.employee = emp;
      this.appointment.service = emp.services.find(s => s.id === serviceId);
    });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  bookAppointment() {
    this.appointment.customer = this.redux.getState().core.user.person;
    const model = this.appointment.writeModel();
    this.appointmentService.post(model)
      .toPromise()
      .then(res => this.toast.success('appointment booked'))

      .catch(error => this.toast.error(error))
      .finally(() => this.router.navigate(['/my-appointments']));
  }

}
