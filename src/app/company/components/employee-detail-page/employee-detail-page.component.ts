import {Component, OnDestroy, OnInit} from '@angular/core';
import {EmployeeService} from '../../../shared/services/employee.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Service} from '../../../core/models/Service';
import {Moment} from 'moment';
import * as moment from 'moment';
import {DateChangedEvent} from '../../../calendar/events/DateChangedEvent';
import {CalendarEvent} from '../../../calendar/models/CalendarEvent';
import {Subscription} from 'rxjs';

@Component({
  selector: 'customer-employee-detail-page',
  templateUrl: './employee-detail-page.component.html',
  styleUrls: ['./employee-detail-page.component.css']
})
export class EmployeeDetailPageComponent implements OnInit, OnDestroy {

  employeeId;
  employee;
  events: CalendarEvent[];

  service: Service;
  date: Moment;

  subscription: Subscription;

  constructor(private empService: EmployeeService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.date = moment.utc().add(1, 'days');
    this.employeeId = +this.route.snapshot.paramMap.get('id');
    this.subscription = this.empService.detail(this.employeeId)
      .subscribe(emp => {
        this.employee = emp;
        this.service = this.employee.services[0];
        this.loadSlots();
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
    const router = this.router;
    const serviceId = this.service.id;

    this.empService.slots(this.employeeId, this.service,
      this.date.clone().startOf('day'),
      this.date.clone().endOf('day'))
      .toPromise()
      .then(slots => {
        this.events = slots.map(slot => {
          return {
            title: slot.start.format('HH:mm') + ' - ' + slot.end.format('HH:mm'),
            start: slot.start,
            end: slot.end,
            onClick: () => {
              router.navigate(['booking/', this.employeeId, serviceId, slot.start.toISOString()]);
            }
          };
        });
      });
  }
}
