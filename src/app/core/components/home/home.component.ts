import { Component, OnInit } from '@angular/core';
import {CompanyService} from '../../../shared/services/company.service';
import {Observable} from 'rxjs';
import {Company} from '../../models/Company';
import {ListResult} from '../../generics/services/AdminModelService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  companies$: Observable<ListResult<Company>>;

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    this.companies$ = this.companyService.get();
  }

}
