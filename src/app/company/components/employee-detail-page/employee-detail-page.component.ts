import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {EmployeeService} from '../../../shared/services/employee.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Service} from '../../../core/models/Service';
import {Moment} from 'moment';
import * as moment from 'moment';
import {CalendarEvent} from '../../../calendar/models/CalendarEvent';
import {Subscription} from 'rxjs';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '../../../Store';
import {FormControl} from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {MatCard} from '@angular/material/card';

@Component({
  selector: 'customer-employee-detail-page',
  templateUrl: './employee-detail-page.component.html',
  styleUrls: ['./employee-detail-page.component.scss']
})
export class EmployeeDetailPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @select((s: IAppState) => s.company.companyName) companyName$;
  @select((s: IAppState) => s.core.isMobileView) isMobile$;
  @ViewChild('empCard') cardEl: HTMLElement;

  employeeId;
  employee;
  events: CalendarEvent[];

  service: Service;

  date: Moment = moment.utc();
  fc = new FormControl(moment.utc());

  subscription: Subscription;

  constructor(private empService: EmployeeService,
              private route: ActivatedRoute,
              private router: Router,
              private redux: NgRedux<IAppState>) {
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

  ngAfterViewInit(): void {
    console.log(this.cardEl);
  }

  cardWidth(): string {
    // TODO: get correct width
    return '60px';
  }

  today() {
    this.fc.patchValue(moment.utc());
    this.date = this.fc.value;
    this.loadSlots();

  }

  previousDay() {
    this.fc.patchValue(this.fc.value.subtract(1, 'days').clone());
    this.date = this.fc.value;
    this.loadSlots();
  }

  nextDay() {
    this.fc.patchValue(this.fc.value.add(1, 'days').clone());
    this.date = this.fc.value;
    this.loadSlots();
  }

  changeDate(event: MatDatepickerInputEvent<Moment>) {
    this.date = event.value;
  }
  handleServiceClick(service: Service) {
    this.service = service;
    this.loadSlots();
  }

  selectedServiceColor(service: Service) {
    if (this.service.id === service.id) {
      return 'p100';
    }
    return '';
  }

  loadSlots() {
    const router = this.router;
    const serviceId = this.service.id;
    const company = this.redux.getState().company.companyName;

    this.empService.slots(this.employeeId, this.service,
      this.date.clone().startOf('day'),
      this.date.clone().endOf('day'))
      .toPromise()
      .then(slots => {
        this.events = slots.map(slot => {
          return {
            title: slot.start.format('HH:mm') + ' - ' + slot.end.format('HH:mm'),
            color: '#FFFFFF',
            start: slot.start,
            end: slot.end,
            onClick: () => {
              router.navigate([`c/${company}/booking/`, this.employeeId, serviceId, slot.start.toISOString()]);
            }
          };
        });
      });
  }
}
