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
              devTools: DevToolsExtension) {
    const enhancers = isDevMode() ? [devTools.enhancer()] : [];
    ngRedux.configureStore(rootReducer, INITIAL_STATE, [], enhancers);
  }
}
