import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Company, User} from '@api/models';
import {PERMISSION_ADD, PERMISSION_VIEW} from '@api/permissions';

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

  @Output() logout = new EventEmitter<void>()
  @Output() toggleLeftPane = new EventEmitter<void>()

  canCreateCompany(): boolean {
    return this.user.hasPermission(PERMISSION_ADD, Company.modelType);
  }

  canManageCompany(): boolean {
    return this.user.hasPermission(PERMISSION_VIEW, Company.modelType);
  }

  canViewEmpDashboard(): boolean {
    return !!this.user.employee;
  }
}
