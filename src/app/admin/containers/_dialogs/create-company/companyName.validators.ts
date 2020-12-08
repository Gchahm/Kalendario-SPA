import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CompanyAdminClient, CompanyClient} from '@api/clients';

export class CompanyNameValidators {
  static shouldBeUnique(companyService: CompanyClient): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const name = control.value as string;
      return companyService.get({name})
        .pipe(
          map(value => {
            if (value.results.length === 0) {
              return null;
            }
            return {shouldBeUnique: true};
          })
        );
    };
  }
}
