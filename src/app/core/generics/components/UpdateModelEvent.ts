import {IReadModel} from '../../models/interfaces/IReadModel';
import {IWriteModel} from '../../models/interfaces/IWriteModel';

export abstract class UpdateModelEvent {
  model: IWriteModel;
  onSuccess: (model: IReadModel) => void;
  onFail: (err) => void;
}
