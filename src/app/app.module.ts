import {isDevMode, NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core/core.module';
import { LayoutModule } from '@angular/cdk/layout';
import {IAppState, INITIAL_STATE, rootReducer} from './Store';
import {DevToolsExtension, NgRedux} from '@angular-redux/store';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgReduxModule} from '@angular-redux/store';
import {MediaMatcherService} from './shared/services/media-matcher.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    NgReduxModule,
    SharedModule,
    CoreModule,
    AppRoutingModule,
    LayoutModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>,
              devTools: DevToolsExtension,
              mediaMatcher: MediaMatcherService) {
    // Can't have the isDevMode on my mobile as it won't load the website,
    // the matcher service blocks enhancers when the website is loaded on mobile view.
    const enhancers = isDevMode() && !mediaMatcher.isMobile ? [devTools.enhancer()] : [];
    ngRedux.configureStore(rootReducer, INITIAL_STATE, [], enhancers);
  }
}
