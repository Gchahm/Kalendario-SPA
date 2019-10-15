import {Component, Input} from '@angular/core';
import {Service} from '../../../core/models/Service';
import {Globals} from '../../../core/services/Globals';
import {DetailsComponent} from '../../../core/generics/components/DetailsComponent';

@Component({
  selector: 'employee-profile',
  templateUrl: './employee-panel.component.html',
  styleUrls: ['./employee-panel.component.css']
})
export class EmployeePanelComponent extends DetailsComponent {

  constructor(public globals: Globals) {
    super();
  }

  @Input() services: Service[];

}
