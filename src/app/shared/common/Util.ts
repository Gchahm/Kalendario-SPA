

export function errorAttacher(form, validationErrors) {
  // 422 errors should be dictionaries with keys for the field name a a string for what the error is about
  // The key will match with the formControl name and this will ensure that the error will be raised against
  // the correct form
  Object.keys(validationErrors).forEach(prop => {
    console.log(prop);
    const formControl = form.get(prop);
    if (formControl) {
      formControl.setErrors({
        serverError: validationErrors[prop]
      });
    }
  });
}
