import { Component } from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromCustomers from '@customers/state';
import {BaseContainer} from '@app/containers/BaseContainer';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent extends BaseContainer {

  constructor(store: Store<fromCustomers.State>) {
    super(store);
  }
}
