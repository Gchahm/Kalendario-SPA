import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../../../shared/services/employee.service';
import {Observable} from 'rxjs';
import {Employee} from '../../../shared/models/Employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  public employees$: Observable<Employee[]>;

  constructor(private empService: EmployeeService) { }

  ngOnInit() {
    this.employees$ = this.empService.getAll();
  }

}
