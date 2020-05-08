import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthInterceptorProvider} from './interceptors/token.interceptor';
import {ErrorInterceptorProvider} from './interceptors/error.interceptor';
import {ToastService} from './services/toast.service';
import {ToastsComponent} from './components/toasts/toasts.component';
import {AngularMaterialModule} from '../angular-material/angular-material.module';
import {TranslateModule} from '@ngx-translate/core';
import {NgReduxModule} from '@angular-redux/store';
import {ColorPickerModule} from 'ngx-color-picker';
import {ColorIconComponent} from './components/color-icon/color-icon.component';
import {MatListTableComponent} from './components/mat-list-table/mat-list-table.component';
import {DurationInputComponent} from './components/duration-input/duration-input.component';
import {ColorInputComponent} from './components/color-input/color-input.component';
import {DateTimeInputComponent} from './components/date-time-input/date-time-input.component';


@NgModule({
  declarations: [
    ToastsComponent,
    ColorInputComponent,
    ColorIconComponent,
    MatListTableComponent,
    DateTimeInputComponent,
    DurationInputComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    TranslateModule.forRoot(),
    NgReduxModule,
    ColorPickerModule,
  ],
  providers: [
    ErrorInterceptorProvider,
    AuthInterceptorProvider,
    ToastService,
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ToastsComponent,
    AngularMaterialModule,
    TranslateModule,
    NgReduxModule,
    ColorPickerModule,
    ColorInputComponent,
    ColorIconComponent,
    MatListTableComponent,
    DateTimeInputComponent,
    DurationInputComponent,
  ]
})
export class SharedModule {
}
