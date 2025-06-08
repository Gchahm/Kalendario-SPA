import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {LandingPageComponent} from '@app/landing/pages/landing-page/landing-page.component';

const routes: Route[] = [
  {
    path: '',
    component: LandingPageComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})export class LandingRoutingModule {
}
