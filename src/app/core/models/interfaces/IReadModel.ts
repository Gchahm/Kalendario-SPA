import {IWriteModel} from './IWriteModel';

export interface IReadModel {
  writeModel(): IWriteModel;
}
