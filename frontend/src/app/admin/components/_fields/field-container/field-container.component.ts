import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'admin-field-container',
  templateUrl: './field-container.component.html',
  styleUrls: ['./field-container.component.css']
})
export class FieldContainerComponent {
  @Input() editMode: boolean;
  @Input() showName: string;
  @Input() toolTip: string;
  @Output() edit = new EventEmitter<void>();
}
