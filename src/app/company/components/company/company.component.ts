import { Component} from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '@app/Store';
import {ActivatedRoute} from '@angular/router';
import {SET_COMPANY_NAME} from '../../actions';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent {

  constructor(redux: NgRedux<IAppState>,
              private route: ActivatedRoute) {
    const companyName = this.route.snapshot.paramMap.get('cid');
    // TODO: Create a service that checks if company exists and dispatch the action from there
    redux.dispatch({type: SET_COMPANY_NAME, name: companyName});
  }

}
