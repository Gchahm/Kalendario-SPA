import {Input} from '@angular/core';

export abstract class BaseDetailsComponent<R> {
  @Input() model: R;

  @Input() isMobile: boolean;
  @Input() isTablet: boolean;
}
