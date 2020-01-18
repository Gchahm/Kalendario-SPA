import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../../../shared/services/employee.service';
import {Observable} from 'rxjs';
import {Employee, EmployeeReadModel} from '../../../core/models/Employee';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'customer-employee-list',
  templateUrl: './employee-list-page.component.html',
  styleUrls: ['./employee-list-page.component.css']
})
export class EmployeeListPageComponent implements OnInit {

  public employees$: Observable<EmployeeReadModel[]>;
  public companyId;

  constructor(private empService: EmployeeService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.companyId = this.route.snapshot.paramMap.get('cid');
    this.employees$ = this.empService.get({company: this.companyId});
  }

  services(employee: Employee): string {
    return employee.services.map(s => s.name).join(' - ');
  }
}
