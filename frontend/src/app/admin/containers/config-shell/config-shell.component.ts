import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from '@admin/state';
import {CompanyConfig, IConfigWriteModel} from '@api/models';
import {Observable} from 'rxjs';

import * as fromConfig from '@admin/state/company';
import {ApiError} from '@api/Errors';

@Component({
  selector: 'admin-config-shell',
  templateUrl: './config-shell.component.html',
  styleUrls: ['./config-shell.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigShellComponent implements OnInit {

  config$: Observable<CompanyConfig>;
  apiError$: Observable<ApiError>;
  editMode$: Observable<boolean>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.config$ = this.store.select(fromConfig.getConfig);
    this.apiError$ = this.store.select(fromConfig.getApiError);
    this.editMode$ = this.store.select(fromConfig.getConfigEditMode);
  }

  toggleEdit(value: boolean) {
    this.store.dispatch(new fromConfig.ToggleEditConfig(value));
  }

  save(formValue: IConfigWriteModel) {
    this.store.dispatch(new fromConfig.RequestUpdateConfig(formValue.ownerId, formValue));
  }
}
