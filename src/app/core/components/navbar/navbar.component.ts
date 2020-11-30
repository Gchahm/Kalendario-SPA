import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Company, User} from '@api/models';
import {PERMISSION_ADD, PERMISSION_VIEW, PermissionModels} from '@api/permissions';
import {checkForPermission} from '@api/models/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Input() isLoggedIn: boolean;
  @Input() showLeftPaneButton: boolean
  @Input() companyName: string;
  @Input() user: User;
  @Input() cartItems: number;

  @Output() logout = new EventEmitter<void>();
  @Output() toggleLeftPane = new EventEmitter<void>();

  canCreateCompany(): boolean {
    return  checkForPermission(this.user, PERMISSION_ADD, PermissionModels.company);
  }

  canManageCompany(): boolean {
    return  checkForPermission(this.user, PERMISSION_VIEW, PermissionModels.company);
  }

  canViewEmpDashboard(): boolean {
    return !!this.user.employee;
  }
}
