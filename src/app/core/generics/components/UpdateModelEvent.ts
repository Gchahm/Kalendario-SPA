import {IReadModel} from '../../models/interfaces/IReadModel';
import {IWriteModel} from '../../models/interfaces/IWriteModel';

export enum HTMLAction {
  patch,
  delete
}

export abstract class UpdateModelEvent {
  action: HTMLAction;
  model: IWriteModel;
  onSuccess: (model: IReadModel) => void;
  onFail: (err) => void;
}
