import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Service, ServiceCategory} from '@api/models';
import {staggeredFadeInAnimation} from '@app/animations';
import {shakeAnimation, fadeInOnEnterAnimation} from 'angular-animations';

@Component({
  selector: 'company-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css'],
  animations: [
    staggeredFadeInAnimation,
  ]
})
export class ServiceListComponent {
  @Input() services: Service[];
  @Input() categories: ServiceCategory[];
  @Input() currentCategoryId: number;
  @Input() currentServiceId: number;
  @Output() selectCategory = new EventEmitter<number>();
  @Output() selectService = new EventEmitter<number>();

  animationState = false;

  update(id: number) {
    this.animationState = !this.animationState;
    this.selectCategory.emit(id);
  }
}
