import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-feature-card',
  templateUrl: './feature-card.component.html',
  styleUrls: ['./feature-card.component.css']
})
export class FeatureCardComponent {
  @Input() feature: Feature;
}

export interface Feature {
  title: string;
  description: string;
  image: string;
}
