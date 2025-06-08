import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';

@Pipe({
  name: 'toMomentDay'
})
export class ToMomentDayPipe implements PipeTransform {

  transform(value: string | Moment, ...args: unknown[]): number {
    return moment.utc(value).date();
  }

}
