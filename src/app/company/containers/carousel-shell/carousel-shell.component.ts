import { Component } from '@angular/core';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'company-carousel-shell',
  templateUrl: './carousel-shell.component.html',
  styleUrls: ['./carousel-shell.component.css']
})
export class CarouselShellComponent {
  photos$: Observable<string[]>;

  constructor() {
    this.photos$ = of([
      'https://www.irishtimes.com/polopoly_fs/1.1772608.1398344527!/image/image.jpg_gen/derivatives/box_620_330/image.jpg'
    ]);
  }
}
