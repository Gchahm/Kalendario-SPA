import {Component, Input} from '@angular/core';

@Component({
  selector: 'company-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  @Input() slides: string[];
}
