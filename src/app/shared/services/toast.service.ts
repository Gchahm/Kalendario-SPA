import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private _snackBar: MatSnackBar) {
  }

  success(message: string, header?: string) {
    this._snackBar.open(message, header, {
      duration: 2000,
      panelClass: 'bg-success'
    });
    // this.toasts.push({ message, header, class: 'bg-success text-light' });
  }

  error(message: string, header?: string) {
    this._snackBar.open(message, header, {
      duration: 2000,
      panelClass: 'bg-danger'
    });
    // this.toasts.push({ message, header, class: 'bg-danger text-light' });
  }

  warning(message: string, header?: string) {
    this._snackBar.open(message, header, {
      duration: 2000,
      panelClass: 'bg-warning'
    });
    // this.toasts.push({ message, header, class: 'bg-warning text-light' });
  }

  message(message: string, header?: string) {
    this._snackBar.open(message, header, {
      duration: 2000,
      panelClass: 'bg-light'
    });
    // this.toasts.push({ message, header, class: 'bg-info text-light' });
  }
}
