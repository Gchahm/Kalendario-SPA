import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Employee} from '../../../core/models/Employee';
import {forkJoin, Subscription} from 'rxjs';
import {AdminEmployeeService} from '../../services/admin-employee.service';
import {ServiceService} from '../../services/service.service';
import {Service} from '../../../core/models/Service';
import {ToastService} from '../../../shared/services/toast.service';
import {MatAccordion, MatDialog} from '@angular/material';
import {Globals} from '../../../core/services/Globals';
import {ListComponent} from '../../../core/generics/components/ListComponent';
import {CreateEmployeeDialogComponent} from '../../dialogs/create-employee/create-employee-dialog.component';

@Component({
  selector: 'admin-employees-page',
  templateUrl: './employees-page.component.html',
  styleUrls: ['./employees-page.component.css']
})
export class EmployeesPageComponent extends ListComponent<Service> implements OnInit, OnDestroy {

  services: Service[];

  @ViewChild('accordion', {read: MatAccordion, static: false}) accordion: MatAccordion;

  constructor(private employeeService: AdminEmployeeService,
              private serviceService: ServiceService,
              public globals: Globals,
              toast: ToastService,
              dialog: MatDialog) {
    super(employeeService, dialog, CreateEmployeeDialogComponent, toast);
  }

  ngOnInit() {
    this.subscription = forkJoin(
      this.serviceService.get(),
      this.employeeService.get(),
    ).subscribe(([services, employees]) => {
      this.services = services;
      this.loadModels(employees);
    });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  dialogData() {
    return this.services;
  }
}
