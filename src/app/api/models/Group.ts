import {Injectable} from '@angular/core';
import {Adapter} from '@api/adapter';
import {IReadModel} from '@api/models/IReadModel';

export class Group implements IReadModel {
  static modelType = 'group';

  id: number = 0;
  name: string = ''
  permissions: number[] = [];

  static fromJs(data: any): Group {
    data = typeof data === 'object' ? data : {};
    const result = new Group();
    result.init(data);
    return result;
  }

  init(data: any) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.permissions = data.permissions;
    }
  }
}

export interface IGroupWriteModel {
  id: number;
  name: string;
  permissions: number[];
}

@Injectable({
  providedIn: 'root'
})
export class GroupAdapter implements Adapter<Group> {
  adapt(data: any): Group {
    return Group.fromJs(data);
  }
}
