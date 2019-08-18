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
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit, OnDestroy {

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

  loadSlots() {
    this.empService.slots(this.employee, this.service, this.date)
      .toPromise()
      .then(slots => this.slots = slots);
  }

  handleEventClicked($event: Slot) {
    this.router.navigate(['booking/', this.employee.id, this.service, $event.start.toISOString()] );
  }
}
