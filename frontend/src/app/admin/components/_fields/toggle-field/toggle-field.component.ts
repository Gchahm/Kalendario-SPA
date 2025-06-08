import {Component, Input} from '@angular/core';
import {ControlImplementation} from '@shared/common/ControlImplementation';

@Component({
  selector: 'app-toggle-field',
  templateUrl: './toggle-field.component.html',
  styleUrls: ['./toggle-field.component.css']
})
export class ToggleFieldComponent extends ControlImplementation<boolean> {
  @Input() showName: string;
  @Input() toolTip: string;
}
