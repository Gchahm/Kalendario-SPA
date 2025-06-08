import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {RequestModel} from '@api/models';
import {fadeInAnimation, fadeInDownAnimation} from 'angular-animations';
import {staggeredFadeInAnimation} from '@app/animations';

@Component({
  selector: 'customers-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.scss'],
  animations: [
    fadeInAnimation(),
    fadeInDownAnimation(),
    staggeredFadeInAnimation
  ]
})
export class RequestCardComponent {
  _request: RequestModel;
  @Input() set request(value: RequestModel) {
    this.animate();
    this._request = value;
  }
  get request(): RequestModel {
    return this._request;
  }
  animationState = false;
  attentionState = false;

  constructor(private ref: ChangeDetectorRef ) {
  }

  animate() {
    this.attentionState = !this.attentionState;
    this.animationState = true;
    setTimeout(() => {
      this.animationState = false;
      this.ref.detectChanges();
    }, 800);
  }
}
