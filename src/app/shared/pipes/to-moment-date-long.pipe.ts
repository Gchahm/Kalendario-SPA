import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'toMomentDateLong'
})
export class ToMomentDateLongPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return moment.utc(value).format('DD MMMM YYYY');
  }

}
