import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ServiceSlot} from '@company/state';
import {pulseAnimation} from 'angular-animations';

@Component({
  selector: 'company-service-slot',
  templateUrl: './service-slot.component.html',
  styleUrls: ['./service-slot.component.css'],
  animations: [
    pulseAnimation({scale: 1.2, duration: 300}),
  ]
})
export class ServiceSlotComponent {
  @Input() slot: ServiceSlot;
  @Input() currentSlotId: number;
  @Output() eventClick = new EventEmitter<void>();

  animationState = false;

  animateEmit() {
    this.animationState = !this.animationState;
    this.eventClick.emit();
  }
}
