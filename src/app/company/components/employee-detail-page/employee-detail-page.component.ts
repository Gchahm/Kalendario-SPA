import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Service} from '@core/models/Service';
import * as moment from 'moment';
import {CalendarEvent} from '@app/admin-scheduling/models/CalendarEvent';
import {Subscription} from 'rxjs';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '@app/Store';
import {FormControl} from '@angular/forms';
import {EmployeeService} from '@app/company/services/employee.service';

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

  fc: FormControl;

  subscription: Subscription;

  constructor(private empService: EmployeeService,
              private route: ActivatedRoute,
              private router: Router,
              private redux: NgRedux<IAppState>) {
  }

  ngOnInit() {
    this.fc = new FormControl(moment.utc().add(1, 'days'));
    this.employeeId = +this.route.snapshot.paramMap.get('id');
    this.subscription = this.empService.detail(this.employeeId)
      .subscribe(emp => {
        this.employee = emp;
        this.service = this.employee.services[0];
        if (!!this.service) {
          this.loadSlots();
        }
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
    this.loadSlots();

  }

  previousDay() {
    this.fc.patchValue(this.fc.value.subtract(1, 'days').clone());
    this.loadSlots();
  }

  nextDay() {
    this.fc.patchValue(this.fc.value.add(1, 'days').clone());
    this.loadSlots();
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

  currentDate() {
    return this.fc.value;
  }

  loadSlots() {
    const router = this.router;
    const serviceId = this.service.id;
    const company = this.redux.getState().company.companyName;

    this.empService.slots(this.employeeId, this.service,
      this.fc.value.clone().startOf('day'),
      this.fc.value.clone().endOf('day'))
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
