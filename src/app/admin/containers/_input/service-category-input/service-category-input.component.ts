import {Component, OnInit, Optional, Self} from '@angular/core';
import {NgControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {ServiceCategory} from '@api/models/ServiceCategory';
import {Store} from '@ngrx/store';
import {State} from '@admin/state';

import * as fromServiceCat from '@app/admin-services/state/categories';
import {ControlImplementation} from '@shared/common/ControlImplementation';

@Component({
  selector: 'admin-service-category-input',
  templateUrl: './service-category-input.component.html',
  styleUrls: ['./service-category-input.component.css'],
})
export class ServiceCategoryInputComponent extends ControlImplementation<number> implements OnInit {

  categories$: Observable<ServiceCategory[]>;

  constructor(private store: Store<State>,
              @Optional() @Self() public ngControl: NgControl) {
    super(ngControl);
  }

  ngOnInit() {
    this.categories$ = this.store.select(fromServiceCat.selectors.selectAll);
  }

  edit() {
    const id = this.value === null ? 0 : this.value;
    this.store.dispatch(fromServiceCat.actions.openFormDialog({id}));
  }

  create() {
    this.store.dispatch(fromServiceCat.actions.openFormDialog({id: 0}));
  }
}
