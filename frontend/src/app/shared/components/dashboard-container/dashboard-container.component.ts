import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IUser} from '@api/models';
import {Route} from '@angular/router';

@Component({
  selector: 'shared-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.css'],
})
export class DashboardContainerComponent implements OnInit {
  @Input() leftPaneOpen: boolean;
  @Input() user: IUser;
  @Input() routes: DashBoardRoute[];
  @Output() toggleShowLeftPane = new EventEmitter<void>();
  @Output() toggleShowLeftPaneButton = new EventEmitter<void>();

  ngOnInit() {
    this.toggleShowLeftPaneButton.emit();
  }
}

export interface DashBoardRoute extends Route {
  fn?: (user: IUser) => boolean;
  icon: string;
  children?: DashBoardRoute[];
}
