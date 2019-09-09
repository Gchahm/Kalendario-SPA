import * as moment from 'moment';

export class CreateAppointmentForm {
  constructor(public startTime: string,
              public startDate: string,
              public customerName: string,
              public customerId: string,
              public service: string) {
  }

  model(): CreateAppointmentModel {
    return {
      customer: this.customerId,
      status: 'A',
      start: moment.utc(this.startDate + ' ' + this.startTime).toISOString(),
      service: this.service
    };
  }
}


export interface CreateAppointmentModel {
  customer: string;
  service: string;
  start: string;
  status: string;
}
