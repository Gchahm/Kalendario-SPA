import {Component, OnDestroy, OnInit} from '@angular/core';
import {Employee} from '../../../shared/models/Employee';
import {Subscription} from 'rxjs';
import {EmployeeService} from '../../../shared/services/employee.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Service} from '../../../shared/models/Service';
import {Moment} from 'moment';
import * as moment from 'moment';
import {Slot} from '../../models/Slot';
import {DateChangedEvent} from '../../../calendar/events/DateChangedEvent';

@Component({
  selector: 'customer-employee-detail-page',
  templateUrl: './employee-detail-page.component.html',
  styleUrls: ['./employee-detail-page.component.css']
})
export class EmployeeDetailPageComponent implements OnInit, OnDestroy {

  employee: Employee;
  slots: Slot[];
  empServiceSubscription: Subscription;
  queryParamSubscription: Subscription;

  service: Service;
  date: Moment;

  constructor(private empService: EmployeeService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.date = moment.utc().add(1, 'days');
    this.queryParamSubscription = this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.empServiceSubscription = this.empService.get(id).subscribe(emp => {
        this.employee = emp;
        this.service = emp.services[0];
        this.loadSlots();
      });
    });

  }

  ngOnDestroy(): void {
    this.empServiceSubscription.unsubscribe();
    this.queryParamSubscription.unsubscribe();
  }

  handleDayRender($event: DateChangedEvent) {
    this.date = $event.date;
    this.loadSlots();
  }

  handleServiceClick(service: Service) {
    this.service = service;
    this.loadSlots();
  }

  selectedServiceColor(service: Service) {
    if (this.service.id === service.id) {
      return 'accent';
    }
    return '';
  }

  loadSlots() {
    this.empService.slots(this.employee, this.service,
      this.date.clone().startOf('day'),
      this.date.clone().endOf('day'))
      .toPromise()
      .then(slots => this.slots = slots);
  }

  handleEventClicked($event: Slot) {
    this.router.navigate(['booking/', this.employee.id, this.service.id, $event.start.toISOString()] );
  }
}
