import {Component, OnDestroy, OnInit} from '@angular/core';
import {Employee} from '../../models/Employee';
import {Subscription} from 'rxjs';
import {EmployeeService} from '../../services/employee.service';
import {ActivatedRoute, Router} from '@angular/router';
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
  empServiceSubscription: Subscription;
  queryParamSubscription: Subscription;

  serviceId: number;
  date: Date;

  constructor(private empService: EmployeeService,
              private slotService: SlotService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.date = new Date();
    this.date.setDate(this.date.getDate() + 1);
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

  handleDayRender($event: any) {
    this.date = new Date($event.date);
    this.loadSlots();
  }

  handleServiceClick(service: Service) {
    this.serviceId = service.id;
    this.loadSlots();
  }

  loadSlots() {
    this.slotService.getAll(this.employee.id, this.serviceId, this.date.getFullYear(), this.date.getMonth() + 1, this.date.getDate())
      .toPromise()
      .then(slots => this.events = slots);
  }

  handleDateEventClicked($event: AgendaEvent) {
    this.router.navigate(['booking/', this.employee.id, this.serviceId, $event.start.toISOString()] );
  }
}
