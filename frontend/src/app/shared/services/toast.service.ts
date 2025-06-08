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
  }

  error(message: string, header?: string) {
    this._snackBar.open(message, header, {
      duration: 2000,
      panelClass: 'bg-danger'
    });
  }

  warning(message: string, header?: string) {
    this._snackBar.open(message, header, {
      duration: 2000,
      panelClass: 'bg-warning'
    });
  }

  message(message: string, header?: string) {
    this._snackBar.open(message, header, {
      duration: 2000,
      panelClass: 'bg-light'
    });
  }
}
