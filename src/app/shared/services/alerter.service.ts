import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {WarningDialogComponent} from '../components/warning-dialog/warning-dialog.component';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlerterService {

  constructor(public dialog: MatDialog) {
  }

  warn(subject, message): Observable<boolean> {
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      width: '250px',
      data: {subject, message}
    });

    return dialogRef.afterClosed();
  }
}
