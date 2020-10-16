import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'toMomentDay'
})
export class ToMomentDayPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): number {
    return moment.utc(value).date();
  }

}
