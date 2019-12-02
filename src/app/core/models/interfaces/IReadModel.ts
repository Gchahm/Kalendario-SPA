import {IWriteModel} from './IWriteModel';

export interface IReadModel {
  id: number;
  writeModel(): IWriteModel;
}
