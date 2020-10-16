import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-kalendario-card',
  templateUrl: './kalendario-card.component.html',
  styleUrls: ['./kalendario-card.component.css']
})
export class KalendarioCardComponent {
  @Input() hasShadow = true;
}
