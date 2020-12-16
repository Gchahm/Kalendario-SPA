import {Component, Input} from '@angular/core';
import {DashBoardRoute} from '@shared/components/dashboard-container/dashboard-container.component';
import {IUser} from '@api/models';

@Component({
  selector: 'auth-dashboard-mobile-container',
  templateUrl: './dashboard-mobile-container.component.html',
  styleUrls: ['./dashboard-mobile-container.component.css']
})
export class DashboardMobileContainerComponent {
  @Input() user: IUser;
  @Input() routes: DashBoardRoute[];
}
