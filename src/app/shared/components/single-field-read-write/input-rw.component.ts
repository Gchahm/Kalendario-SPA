import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ApiError, ValidationError} from '@api/Errors';
import {ControlImplementation} from '@shared/common/ControlImplementation';

@Component({
  selector: 'admin-input-rw',
  templateUrl: './input-rw.component.html',
  styleUrls: ['./input-rw.component.css'],
})
export class InputRwComponent extends ControlImplementation<string> {
  @Input() editMode: boolean;
  @Input() showName: string;
  @Input() toolTip: string;

  private _inputType = 'text';
  @Input() set inputType(value: string) {
    this._inputType = value;
    this.showForm = value !== 'none';
    this.useInput = ['text', 'number'].includes(value);
    this.useTextArea = value === 'textarea';
    this.useColor = value === 'color';
    this.useToggle = value === 'toggle';
    this.useDuration = value === 'duration';
  }

  get inputType(): string {
    return this._inputType;
  }

  @Input() set apiError(value: ApiError) {
    if (value instanceof ValidationError) {
      Object.keys(value.detail).forEach(prop => {
        if (prop === this.ngControl.name) {
          this.form.get('formControl').setErrors({
            serverError: value.detail[prop]
          });
        }
      });
    }
  }

  @Output() edit = new EventEmitter<void>();

  showForm = true;
  useInput = true;
  useTextArea = false;
  useColor = false;
  useToggle = false;
  useDuration = false;
}
