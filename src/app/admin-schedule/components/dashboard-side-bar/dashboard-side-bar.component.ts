import {Component, Input} from '@angular/core';
import {MenuOption} from '../../models/MenuOption';

@Component({
  selector: 'admin-dashboard-side-bar',
  templateUrl: './dashboard-side-bar.component.html',
  styleUrls: ['./dashboard-side-bar.component.css']
})
export class DashboardSideBarComponent {

  @Input() options: MenuOption[] = [];

  constructor() { }

}
