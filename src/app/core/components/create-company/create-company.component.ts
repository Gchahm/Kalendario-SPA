import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {CompanyNameValidators} from '@app/company/components/company/companyName.validators';
import {CompanyService} from '@shared/services/company.service';
import {Router} from '@angular/router';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '@app/Store';
import {AuthService} from '@shared/services/auth.service';
import {Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.scss']
})
export class CreateCompanyComponent implements OnInit, OnDestroy {

  form;
  subscription: Subscription;

  constructor(private fb: FormBuilder,
              private companyService: CompanyService,
              private authService: AuthService,
              private redux: NgRedux<IAppState>,
              private router: Router) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['',
        [Validators.required, CompanyNameValidators.cannotContainForbiddenCharacters],
        CompanyNameValidators.shouldBeUnique(this.companyService)]
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  get name(): AbstractControl {
    return this.form.get('name');
  }

  onSubmit() {
    const company = this.form.value;
    company.owner = this.redux.getState().core.user.person.id;
    this.subscription = this.companyService.post(company).pipe(
      switchMap(p => this.authService.whoAmI())
    ).subscribe( u => {
        this.router.navigate(['admin/home']);
      }
    );
  }
}
