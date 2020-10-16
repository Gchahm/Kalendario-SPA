import {FormGroup} from '@angular/forms';
import {ValidationError} from '@api/Errors';

const NON_FIELD_ERRORS = 'nonFieldErrors';

/** 422 errors will be dictionaries with keys for the field name a a string for what the error is about
The keys will match with a formControl name and this will ensure that the error will be raised against
 the correct control */
export function reactiveFormErrorHandler(form: FormGroup, error: ValidationError) {
  Object.keys(error.detail).forEach(prop => {
    if (prop === NON_FIELD_ERRORS) {
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
