import {IWriteModel} from '../../core/models/interfaces/IWriteModel';

export abstract class ModelEvent {
  action: string;
  model: IWriteModel;
}
