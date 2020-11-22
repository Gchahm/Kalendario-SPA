import {Component, Input, OnInit} from '@angular/core';
import {pulseAnimation} from 'angular-animations';

@Component({
  selector: 'app-fab-button',
  templateUrl: './fab-button.component.html',
  styleUrls: ['./fab-button.component.css'],
  animations: [pulseAnimation({delay: 0, duration: 300, scale: 1.2})]
})
export class FabButtonComponent {
  @Input() icon: string;
  pulseState = false;
}
