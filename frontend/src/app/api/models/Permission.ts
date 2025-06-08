import {Injectable} from '@angular/core';
import {Adapter} from '@api/adapter';
import {IReadModel} from '@api/models/IReadModel';

export class Permission implements IReadModel {
  static modelType = 'permission';

  id: number;
  name: string;
  codename: string;

  get type(): string {
    return this.codename.substr(0, this.codename.indexOf('_'))
  }

  get model(): string {
    return this.codename.substring(this.codename.indexOf('_') + 1, this.codename.length)
  }

  static fromJs(data: any): Permission {
    data = typeof data === 'object' ? data : {};
    const result = new Permission();
    result.init(data);
    return result;
  }

  init(data: any) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.codename = data.codename;
    }
  }
}

export interface IPermissionWriteModel {
  id: number;
  name: string;
  codename: string;
}

@Injectable({
  providedIn: 'root'
})
export class PermissionAdapter implements Adapter<Permission> {
  adapt(data: any): Permission {
    return Permission.fromJs(data);
  }
}
