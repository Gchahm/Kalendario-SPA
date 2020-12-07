import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IUser} from '@api/models';
import {Route} from '@angular/router';
import {expandCollapseDrawerAnimation} from '@app/animations';

@Component({
  selector: 'shared-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.css'],
  animations: [expandCollapseDrawerAnimation(0.2)]
})
export class DashboardContainerComponent implements OnInit {
  @Input() isMobile: boolean;
  private _leftPaneOpen: boolean;
  @Input() set leftPaneOpen(value: boolean) {
    this._leftPaneOpen = value;
    setTimeout(() => this.ref.detectChanges(), 50);
    setTimeout(() => this.ref.detectChanges(), 100);
    setTimeout(() => this.ref.detectChanges(), 150);
    setTimeout(() => this.ref.detectChanges(), 201);
  }

  get leftPaneOpen(): boolean {
    return this._leftPaneOpen;
  }

  @Input() user: IUser;
  @Input() routes: DashBoardRoute[];
  @Output() toggleShowLeftPane = new EventEmitter<void>();

  constructor(private ref: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.toggleIfMobile();
  }

  toggleIfMobile() {
    if (this.isMobile) {
      this.toggleShowLeftPane.emit();
    }
  }
}

export interface DashBoardRoute extends Route {
  fn?: (user: IUser) => boolean;
  icon: string;
  children?: DashBoardRoute[];
}
