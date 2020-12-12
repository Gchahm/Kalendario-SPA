import {FormGroup} from '@angular/forms';

export function matcherValidator(firstField: string, secondField: string) {
  return (g: FormGroup) => g.get(firstField).value === g.get(secondField).value ? null : {mismatch: true};
}

