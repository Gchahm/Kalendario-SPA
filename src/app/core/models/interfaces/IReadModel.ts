import {IWriteModel} from './IWriteModel';

export interface IReadModel {
  id: number;
  writeModel(): IWriteModel;
}

export function modelId(model: IReadModel) {
  if (model) {
    return model.id;
  }
  return null;
}
