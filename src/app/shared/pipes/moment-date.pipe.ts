import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';

@Pipe({
  name: 'momentDate'
})
export class MomentDatePipe implements PipeTransform {

  transform(value: string | Moment, format: string = 'DD/MM/YYYY'): string {
    return value ? moment.utc(value).format(format) : '';
  }

}
