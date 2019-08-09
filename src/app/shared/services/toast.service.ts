import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() {
  }

  toasts: any[] = [];

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  success(message: string, header: string = 'SUCCESS!') {
    this.toasts.push({ message, header, class: 'bg-success text-light' });
  }

  error(message: string, header: string = 'ERROR') {
    this.toasts.push({ message, header, class: 'bg-danger text-light' });
  }

  warning(message: string, header: string = 'WARNING') {
    this.toasts.push({ message, header, class: 'bg-warning text-light' });
  }

  message(message: string, header: string = 'NEED HELP?') {
    this.toasts.push({ message, header, class: 'bg-info text-light' });
  }
}
