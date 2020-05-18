import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthInterceptorProvider} from './interceptors/token.interceptor';
import {ErrorInterceptorProvider} from './interceptors/error.interceptor';
import {ToastService} from './services/toast.service';
import {AngularMaterialModule} from '../angular-material/angular-material.module';
import {TranslateModule} from '@ngx-translate/core';
import {ColorPickerModule} from 'ngx-color-picker';
import {ColorIconComponent} from './components/color-icon/color-icon.component';
import {MatListTableComponent} from './components/mat-list-table/mat-list-table.component';
import {DurationInputComponent} from './components/duration-input/duration-input.component';
import {ColorInputComponent} from './components/color-input/color-input.component';
import {DateTimeInputComponent} from './components/date-time-input/date-time-input.component';
import {MAT_MOMENT_DATE_FORMATS, MatMomentDateModule} from '@angular/material-moment-adapter';
import { WarningDialogComponent } from './components/warning-dialog/warning-dialog.component';
import { CustomerInputComponent } from './components/customer-input/customer-input.component';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentUtcDateAdapter} from './adapters/MomentUtcDateAdapter';


@NgModule({
  declarations: [
    ColorInputComponent,
    ColorIconComponent,
    MatListTableComponent,
    DateTimeInputComponent,
    DurationInputComponent,
    WarningDialogComponent,
    CustomerInputComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    TranslateModule.forRoot(),
    ColorPickerModule,
    MatMomentDateModule,
  ],
  providers: [
    ErrorInterceptorProvider,
    AuthInterceptorProvider,
    ToastService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentUtcDateAdapter },
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    TranslateModule,
    ColorPickerModule,
    ColorInputComponent,
    ColorIconComponent,
    MatListTableComponent,
    DateTimeInputComponent,
    DurationInputComponent,
    MatMomentDateModule,
    CustomerInputComponent,
  ]
})
export class SharedModule {
}
