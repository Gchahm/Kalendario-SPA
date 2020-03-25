import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-color-icon',
  templateUrl: './color-icon.component.html',
  styleUrls: ['./color-icon.component.css']
})
export class ColorIconComponent {
  @Input() color: string;
}
