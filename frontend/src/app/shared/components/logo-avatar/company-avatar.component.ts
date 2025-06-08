import {Component, Input} from '@angular/core';

@Component({
  selector: 'shared-company-avatar',
  templateUrl: './company-avatar.component.html',
  styleUrls: ['./company-avatar.component.css'],
})
export class CompanyAvatarComponent {
  @Input() logo: string;
  @Input() name: string;
  @Input() address: string;
}
