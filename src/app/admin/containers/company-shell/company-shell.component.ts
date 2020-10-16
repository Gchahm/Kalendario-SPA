import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Company, CompanyConfig, ICompanyWriteModel, IConfigWriteModel} from '@api/models';
import {ApiError} from '@api/Errors';
import {Store} from '@ngrx/store';
import {State} from '@admin/state';
import * as fromCompany from '@admin/state/company';
import {ImageSnippet} from '@shared/components/image-input/image-input.component';

@Component({
  selector: 'admin-company-shell',
  templateUrl: './company-shell.component.html',
  styleUrls: ['./company-shell.component.css']
})
export class CompanyShellComponent implements OnInit {

  company$: Observable<Company>;
  config$: Observable<CompanyConfig>;
  apiError$: Observable<ApiError>;
  editMode$: Observable<boolean>;
  cfgEditMode$: Observable<boolean>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.company$ = this.store.select(fromCompany.getCompany);
    this.config$ = this.store.select(fromCompany.getConfig);
    this.apiError$ = this.store.select(fromCompany.getApiError);
    this.editMode$ = this.store.select(fromCompany.getCompanyEditMode);
    this.cfgEditMode$ = this.store.select(fromCompany.getConfigEditMode);
  }

  toggleEdit(value: boolean) {
    this.store.dispatch(new fromCompany.ToggleEditCompany(value));
  }

  toggleEditConfig(value: boolean) {
    this.store.dispatch(new fromCompany.ToggleEditConfig(value));
  }

  save(formValue: ICompanyWriteModel) {
    this.store.dispatch(new fromCompany.RequestUpdateCompany(formValue.id, formValue));
  }

  saveConfig(formValue: IConfigWriteModel) {
    this.store.dispatch(new fromCompany.RequestUpdateConfig(formValue.ownerId, formValue));
  }

  onPhotoChange(image: ImageSnippet) {
    this.store.dispatch(new fromCompany.RequestPhotoUpdate(image));
  }
}
