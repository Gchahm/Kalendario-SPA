import {Component, Input} from '@angular/core';
import {IUser} from '@api/models';

@Component({
  selector: 'customer-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  @Input() user: IUser;
}
