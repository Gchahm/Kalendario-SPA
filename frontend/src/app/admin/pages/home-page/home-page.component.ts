import {Component} from '@angular/core';
import * as fromCompany from '@admin/state/company';
import {Store} from '@ngrx/store';
import {State} from '@admin/state';

@Component({
  selector: 'admin-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  constructor(protected store: Store<State>) {
    this.store.dispatch(new fromCompany.RequestCompany());
  }
}
