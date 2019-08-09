import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthInterceptorProvider} from './interceptors/token.interceptor';
import {ErrorInterceptorProvider} from './interceptors/error.interceptor';
import {ToastService} from './services/toast.service';
import { ToastsComponent } from './components/toasts/toasts.component';



@NgModule({
  declarations: [
  ToastsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    ErrorInterceptorProvider,
    AuthInterceptorProvider,
    ToastService
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ToastsComponent,
  ]
})
export class SharedModule { }
