import {Observable, of} from 'rxjs';
import {User} from '@core/models/User';
import {IReadModel} from '@core/models/interfaces/IReadModel';
import {IWriteModel} from '@core/models/interfaces/IWriteModel';

export class ReadModelStub implements IReadModel {
  id: number;

  writeModel(): IWriteModel {
    return undefined;
  }
}

export class AuthServiceMock {
  constructor() {
  }

  whoAmI() {
    return of(User.AnonymousUser());
  }

}

export class MatDialogMock {
  open() {
    return {
      afterClosed: () => of(true)
    };
  }
}

export class MatSnackBarMock {
  open() {
    return {
      afterClosed: () => of(true)
    };
  }
}

export class MatDialogRefMock {
  close(value = '') {
  }
}

export class RouterMock {
  navitage(routes) {
  }
}

export class AlerterServiceMock {
  warn(subject, message): Observable<boolean> {
    return of(false);
  }
}

export class ToastServiceMock {
  success(message: string, header?: string) {
  }

  error(message: string, header?: string) {
  }

  warning(message: string, header?: string) {
  }

  message(message: string, header?: string) {
  }
}

export class MediaMatcherServiceMock {

  get isMobile(): boolean {
    return false;
  }

  get isTablet(): boolean {
    return false;
  }

  addMobileQueryListener(fn) {
  }

  addTabletQueryListener(fn) {
  }

  removeMobileQueryListener(fn) {
  }

  removeTabletQueryListener(fn) {
  }
}
