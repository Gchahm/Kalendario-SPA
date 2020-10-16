import {Component, Input} from '@angular/core';
import {UserViewModel} from '@admin/state/users';

@Component({
  selector: 'admin-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  @Input() model: UserViewModel;

  groups() {
    return this.model.groups.map(g => ({name: g.name, value: ''}))
  }

  details(): { name: string, value: string }[] {
    return [
      {name: 'name', value: this.model.user.name},
      {name: 'email', value: this.model.user.email},
      {name: 'employee', value: !this.model.employee ? null : this.model.employee.name},
    ];
  }
}

