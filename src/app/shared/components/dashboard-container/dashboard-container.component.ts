import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IUser} from '@api/models';
import {Route} from '@angular/router';

@Component({
  selector: 'shared-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.css']
})
export class DashboardContainerComponent {
  @Input() isMobile: boolean;
  @Input() leftPaneOpen: boolean;
  @Input() user: IUser;
  @Input() routes: DashBoardRoute[];
  @Output() routeClick = new EventEmitter<DashBoardRoute>();

}

export interface DashBoardRoute extends Route {
  fn?: (user: IUser) => boolean;
  icon: string;
  children?: DashBoardRoute[];
}
