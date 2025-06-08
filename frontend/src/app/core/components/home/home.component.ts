import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {filter, map, startWith, switchMap} from 'rxjs/operators';
import {CompanyClient} from '@api/clients';
import {Company} from '@api/models';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  companies$: Observable<Company[]>;
  companyControl = new FormControl();

  constructor(private companyService: CompanyClient) {
  }

  ngOnInit() {

    this.companies$ = this.companyControl.valueChanges
      .pipe(
        startWith(''),
        filter((v: string) => v.length > 2),
        switchMap(search => this.companyService.get({search})),
        map(res => res.results)
      );
  }

}
