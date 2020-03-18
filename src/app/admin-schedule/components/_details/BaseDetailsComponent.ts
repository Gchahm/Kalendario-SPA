import {IReadModel} from '../../../core/models/interfaces/IReadModel';
import {Input} from '@angular/core';

export abstract class BaseDetailsComponent<R extends IReadModel> {
  @Input() model: R;
}
