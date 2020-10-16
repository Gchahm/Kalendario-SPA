import {Component, OnInit} from '@angular/core';
import {Permission} from '@api/models';
import {CheckBoxForm} from '@admin/components/_form/CheckBoxForm';

@Component({
  selector: 'admin-group-form-permissions',
  templateUrl: './group-form-permissions.component.html',
  styleUrls: ['./group-form-permissions.component.css']
})
export class GroupFormPermissionsComponent extends CheckBoxForm<Permission> implements OnInit {

  modelField(model: Permission): string {
    return model.model;
  }
}
