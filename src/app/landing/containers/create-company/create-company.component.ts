import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CompanyNameValidators} from '@app/landing/containers/create-company/companyName.validators';
import {Router} from '@angular/router';
import {reactiveFormErrorHandler} from '@shared/common/Util';
import {ValidationError} from '@api/Errors';
import {CompanyAdminClient, CompanyClient} from '@api/clients';
import {Store} from '@ngrx/store';
import * as fromCore from '@core/state';


@Component({
  selector: 'landing-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.scss']
})
export class CreateCompanyComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private adminCompanyService: CompanyAdminClient,
              private companyService: CompanyClient,
              private store: Store<fromCore.CoreState>,
              private router: Router) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required], CompanyNameValidators.shouldBeUnique(this.companyService)]
    });
  }

  onSubmit() {
    const company = this.form.value;
    // TODO: get an effect for this
    this.adminCompanyService.post(company)
      .toPromise()
      .then(() => {
          this.store.dispatch(new fromCore.InitializeUser());
          this.router.navigate(['admin/home']);
        }
      ).catch(err => {
      if (err instanceof ValidationError) {
        reactiveFormErrorHandler(this.form, err);
      }
    });
  }
}
