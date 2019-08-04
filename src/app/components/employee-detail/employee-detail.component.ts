import {Component, OnDestroy, OnInit} from '@angular/core';
import {Employee} from '../../models/Employee';
import {Observable, Subscription} from 'rxjs';
import {EmployeeService} from '../../services/employee.service';
import {ActivatedRoute, Router} from '@angular/router';
import timeGridPlugin from '@fullcalendar/timegrid';
import {AppointmentService} from '../../services/appointment.service';
import {AgendaEvent} from '../../models/AgendaEvent';
import {SlotService} from '../../services/slot.service';
import {Service} from '../../models/Service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit, OnDestroy {

  employee: Employee;
  events: AgendaEvent[];
  calendarPlugins = [timeGridPlugin];
  empServiceSubscription: Subscription;
  queryParamSubscription: Subscription;

  visibleRange = {
    start: '2019-08-03',
    end: '2019-08-06'
  };

  empId: number;
  serviceId: number;
  date: Date;

  constructor(private empService: EmployeeService,
              private slotService: SlotService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.date = new Date();
    this.date.setDate(this.date.getDate() + 1);
    this.queryParamSubscription = this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.empServiceSubscription = this.empService.get(id).subscribe(emp => {
        this.employee = emp;
        this.empId = emp.id;
        this.serviceId = emp.services[0].id;
        this.loadSlots();
      });
    });

  }

  ngOnDestroy(): void {
    this.empServiceSubscription.unsubscribe();
    this.queryParamSubscription.unsubscribe();
  }

  handleDayRender($event: any) {
    this.date = new Date($event.date);
    this.loadSlots();
  }

  handleServiceClick(service: Service) {
    this.serviceId = service.id;
    this.loadSlots();
  }

  loadSlots() {
    this.slotService.getAll(this.empId, this.serviceId, this.date.getFullYear(), this.date.getMonth() + 1, this.date.getDate())
      .toPromise()
      .then(slots => this.events = slots);
  }

  handleFCEventClick($event: any) {
    console.log($event);
  }
}
