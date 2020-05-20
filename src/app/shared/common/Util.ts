import {FormGroup} from '@angular/forms';
import {ValidationError} from './Errors';

const NON_FIELD_ERRORS = 'nonFieldErrors';

// 422 errors should be dictionaries with keys for the field name a a string for what the error is about
// The key will match with the formControl name and this will ensure that the error will be raised against
// the correct form
export function reactiveFormErrorHandler(form: FormGroup, error: ValidationError) {
  Object.keys(error.detail).forEach(prop => {
    console.log(error);
    if (prop === NON_FIELD_ERRORS) {
      console.log(prop);
      form.setErrors(error.detail[prop]);
    } else {
      const formControl = form.get(prop);
      if (formControl) {
        formControl.setErrors({
          serverError: error.detail[prop]
        });
      }
    }
  });
}
