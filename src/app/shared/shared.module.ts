import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthInterceptorProvider} from './interceptors/token.interceptor';
import {ErrorInterceptorProvider} from './interceptors/error.interceptor';
import {ToastService} from './services/toast.service';
import { ToastsComponent } from './components/toasts/toasts.component';
import {AngularMaterialModule} from '../angular-material/angular-material.module';
import {TranslateModule} from '@ngx-translate/core';
import {NgReduxModule} from '@angular-redux/store';
import {ColorPickerModule} from 'ngx-color-picker';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { ColorIconComponent } from './components/color-icon/color-icon.component';


@NgModule({
  declarations: [
  ToastsComponent,
  ColorPickerComponent,
  ColorIconComponent
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
    ColorPickerComponent,
    ColorIconComponent,
  ]
})
export class SharedModule { }
