import {Component, Input} from '@angular/core';
import {GroupViewModel} from '@admin/state/groups';

@Component({
  selector: 'admin-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})
export class GroupDetailsComponent {
  @Input() model: GroupViewModel;

  permissions() {
    return this.model.permissions.map(p => ({name: p.model, value: p.type}))
  }

  details(): { name: string, value: string }[] {
    return [
      {name: 'name', value: this.model.group.name},
    ];
  }
}
