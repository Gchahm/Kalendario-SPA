import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
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
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {WarningDialogComponent} from './components/warning-dialog/warning-dialog.component';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import {MomentUtcDateAdapter, MY_FORMATS} from './adapters/MomentUtcDateAdapter';
import {AppointmentStatusPipe} from './pipes/appointment-status.pipe';
import {LoginRegisterShellComponent} from './containers/login-register-shell/login-register-shell.component';
import {RegisterComponent} from '@shared/components/register/register.component';
import {LoginComponent} from '@shared/components/login/login.component';
import {TextInputDialogComponent} from './components/text-input-dialog/text-input-dialog.component';
import {KalendarioCardComponent} from './components/kalendario-card/kalendario-card.component';
import {CompanyAvatarComponent} from '@shared/components/logo-avatar/company-avatar.component';
import {ImageInputComponent} from './components/image-input/image-input.component';
import {RemoveHyphenPipe} from './pipes/remove-hyphen.pipe';
import {DateTimePrettyInputComponent} from '@shared/components/date-time-pretty-input/date-time-pretty-input.component';
import {ToMomentDayPipe} from './pipes/to-moment-day.pipe';
import {ToMomentDateLongPipe} from './pipes/to-moment-date-long.pipe';
import {RouterModule} from '@angular/router';
import { DashboardContainerComponent } from './components/dashboard-container/dashboard-container.component';
import { DashboardContainerShellComponent } from './containers/dashboard-container-shell/dashboard-container-shell.component';
import {InputRwComponent} from '@shared/components/single-field-read-write/input-rw.component';
import {CustomerInputComponent} from '@shared/components/customer-input/customer-input.component';
import {CreateCustomerDialogComponent} from '@shared/containers/create-customer/create-customer-dialog.component';
import {CustomerFormComponent} from '@shared/components/customer-form/customer-form.component';
import { MomentDatePipe } from './pipes/moment-date.pipe';
import { FabButtonComponent } from './components/fab-button/fab-button.component';
import { FacebookLoginShellComponent } from './containers/facebook-login-shell/facebook-login-shell.component';


@NgModule({
  declarations: [
    ColorInputComponent,
    ColorIconComponent,
    MatListTableComponent,
    DateTimeInputComponent,
    DurationInputComponent,
    WarningDialogComponent,
    AppointmentStatusPipe,
    LoginRegisterShellComponent,
    RegisterComponent,
    LoginComponent,
    TextInputDialogComponent,
    KalendarioCardComponent,
    CompanyAvatarComponent,
    ImageInputComponent,
    RemoveHyphenPipe,
    DateTimePrettyInputComponent,
    ToMomentDayPipe,
    ToMomentDateLongPipe,
    DashboardContainerComponent,
    DashboardContainerShellComponent,
    InputRwComponent,
    CustomerInputComponent,
    CreateCustomerDialogComponent,
    CustomerFormComponent,
    MomentDatePipe,
    FabButtonComponent,
    FacebookLoginShellComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    TranslateModule.forRoot(),
    ColorPickerModule,
    MatMomentDateModule,
    RouterModule,
  ],
  providers: [
    ErrorInterceptorProvider,
    AuthInterceptorProvider,
    ToastService,
    // {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    {provide: DateAdapter, useClass: MomentUtcDateAdapter},
  ],
    exports: [
        CommonModule,
        HttpClientModule,
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
        AppointmentStatusPipe,
        RegisterComponent,
        LoginComponent,
        LoginRegisterShellComponent,
        TextInputDialogComponent,
        KalendarioCardComponent,
        KalendarioCardComponent,
        CompanyAvatarComponent,
        ImageInputComponent,
        RemoveHyphenPipe,
        DateTimePrettyInputComponent,
        ToMomentDayPipe,
        ToMomentDateLongPipe,
        DashboardContainerComponent,
        DashboardContainerShellComponent,
        InputRwComponent,
        CustomerInputComponent,
        MomentDatePipe,
        FabButtonComponent,
    ]
})
export class SharedModule {
}

