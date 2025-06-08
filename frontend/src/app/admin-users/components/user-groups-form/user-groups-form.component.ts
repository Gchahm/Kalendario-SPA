import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CheckBoxForm} from '@admin/components/_form/CheckBoxForm';
import {IGroup} from '@api/models';
import {UserViewModel} from '@app/admin-users/state';

@Component({
  selector: 'admin-user-groups-services',
  templateUrl: './user-groups-form.component.html',
  styleUrls: ['./user-groups-form.component.css']
})
export class UserGroupsFormComponent extends CheckBoxForm<IGroup> implements OnInit {
  @Input() model: UserViewModel;
  @Input() editMode = false;
  @Output() edit = new EventEmitter<boolean>();

  modelField(model: IGroup): string {
    return model.name;
  }

  groupName(id: number): string {
    return this.models.find(g => g.id === id)?.name;
  }
}
