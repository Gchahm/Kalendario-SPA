import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from '@api/models';
import {Route} from '@angular/router';

@Component({
  selector: 'shared-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.css']
})
export class DashboardContainerComponent {
  @Input() isMobile: boolean;
  @Input() leftPaneOpen: boolean;
  @Input() user: User;
  @Input() routes: DashBoardRoute[];
  @Output() routeClick = new EventEmitter<DashBoardRoute>();

}

export interface DashBoardRoute extends Route {
  fn?: (user: User) => boolean;
  icon: string;
  children?: DashBoardRoute[];
}
