import {Component, OnDestroy, OnInit} from '@angular/core';
import {Employee} from '../../models/Employee';
import {Subscription} from 'rxjs';
import {EmployeeService} from '../../services/employee.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SlotService} from '../../services/slot.service';
import {Service} from '../../models/Service';
import {Moment} from 'moment';
import * as moment from 'moment';
import {Slot} from '../../models/Slot';
import {DateChangedEvent} from '../../calendar/events/DateChangedEvent';
import {CalendarEvent} from '../../calendar/models/CalendarEvent';

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

  serviceId: number;
  date: Moment;

  constructor(private empService: EmployeeService,
              private slotService: SlotService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.date = moment.utc().add(1, 'days');
    this.queryParamSubscription = this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.empServiceSubscription = this.empService.get(id).subscribe(emp => {
        this.employee = emp;
        this.serviceId = emp.services[0].id;
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
    this.serviceId = service.id;
    this.loadSlots();
  }

  loadSlots() {
    this.slotService.getAll(this.employee.id, this.serviceId, this.date.year(), this.date.month() + 1, this.date.date())
      .toPromise()
      .then(slots => this.slots = slots);
  }

  handleDateEventClicked($event: CalendarEvent) {
    this.router.navigate(['booking/', this.employee.id, this.serviceId, $event.start.toISOString()] );
  }
}
