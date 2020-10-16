import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CompanyNameValidators} from '@admin/containers/_dialogs/create-company/companyName.validators';
import {Router} from '@angular/router';
import {AuthService} from '@shared/services/auth.service';
import {switchMap} from 'rxjs/operators';
import {reactiveFormErrorHandler} from '@shared/common/Util';
import {ValidationError} from '@api/Errors';
import {CompanyAdminClient} from '@api/clients';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.scss']
})
export class CreateCompanyComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private companyService: CompanyAdminClient,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['',
        [Validators.required], CompanyNameValidators.shouldBeUnique(this.companyService)]
    });
  }

  onSubmit() {
    const company = this.form.value;
    // TODO: get an effect for this
    this.companyService.post(company)
      .pipe(
        switchMap(p => this.authService.whoAmI())
      ).toPromise()
      .then(() => {
          this.router.navigate(['admin/home']);
        }
      ).catch(err => {
      if (err instanceof ValidationError) {
        reactiveFormErrorHandler(this.form, err);
      }
    });
  }
}
