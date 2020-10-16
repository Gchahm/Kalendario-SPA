import {NgModule} from '@angular/core';
import { CardElementComponent } from './components/card-element/card-element.component';
import {NgxStripeModule} from 'ngx-stripe';
import {environment} from '../../environments/environment';


@NgModule({
  declarations: [CardElementComponent],
  imports: [
    NgxStripeModule.forRoot(environment.stripePk),
  ],
  exports: [
    CardElementComponent,
  ]
})
export class StripeModule {
}
