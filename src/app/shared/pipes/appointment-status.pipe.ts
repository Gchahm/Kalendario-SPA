import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'appointmentStatus'
})
export class AppointmentStatusPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case 'A':
        return 'Accepted';
      case 'M':
        return 'Rejected';
      default:
        return 'Pending';
    }
  }

}
