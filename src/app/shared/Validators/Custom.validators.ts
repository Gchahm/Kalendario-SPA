import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from '@angular/forms';


export class CustomValidators {
  static number(prms: {min: number, max: number}): ValidatorFn {
    return (control: FormControl): ValidationErrors | null => {
      const val: number = control.value;
      if (isNaN(val) || /\D/.test(val.toString())) {
        return {number: true};
      } else if (!isNaN(prms.min) && !isNaN(prms.max)) {

        return val < prms.min || val > prms.max ? {number: true} : null;
      } else if (!isNaN(prms.min)) {

        return val < prms.min ? {number: true} : null;
      } else if (!isNaN(prms.max)) {

        return val > prms.max ? {number: true} : null;
      } else {

        return null;
      }
    };
  }

  static cannotBeZero(control: AbstractControl): ValidationErrors | null {
    if (control.value === 0) {
      return {cannotBeZero: true};
    }
    return null;
  }
}
