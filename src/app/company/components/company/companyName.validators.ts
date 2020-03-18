import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {CompanyService} from '../../../shared/services/company.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export class CompanyNameValidators {
  static cannotContainForbiddenCharacters(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string).indexOf('_') !== -1) {
      return {cannotContainForbiddenCharacters: true};
    }
    return null;
  }

  static shouldBeUnique(companyService: CompanyService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const name = control.value as string;
      return companyService.get({name})
        .pipe(
          map(value => {
            if (value.length === 0) {
              return null;
            }
            return {shouldBeUnique: true};
          })
        );
    };
  }
}
