import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatFormFieldControl} from '@angular/material/form-field';
import {Subject} from 'rxjs';
import {NgControl} from '@angular/forms';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css'],
  providers: [{provide: MatFormFieldControl, useExisting: ColorPickerComponent}],
})
export class ColorPickerComponent implements MatFormFieldControl<string> {

  @Input() color: string;
  @Output() colorChange = new EventEmitter<string>();

  readonly autofilled: boolean;
  readonly controlType: string;
  readonly disabled: boolean;
  readonly empty: boolean;
  readonly errorState: boolean;
  readonly focused: boolean;
  readonly id: string;
  readonly ngControl: NgControl | null;
  readonly placeholder: string;
  readonly required: boolean;
  readonly shouldLabelFloat: boolean;
  readonly stateChanges = new Subject<void>();
  value: string | null;

  onContainerClick(event: MouseEvent): void {
  }

  setDescribedByIds(ids: string[]): void {
  }

  constructor() { }

  colorChanged(event) {
    this.stateChanges.next();
    this.colorChange.emit(event);
  }

}
