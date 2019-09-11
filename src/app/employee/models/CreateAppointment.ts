import * as moment from 'moment';

export class CreateAppointmentForm {
  constructor(public startTime: string,
              public startDate: string,
              public customerName: string,
              public customerId: string,
              public service: string,
              public employeeId: string) {
  }

  model(): CreateAppointmentModel {
    return {
      customer: this.customerId,
      status: 'A',
      start: moment.utc(this.startDate + ' ' + this.startTime).toISOString(),
      service: this.service,
      employee: this.employeeId
    };
  }
}


export interface CreateAppointmentModel {
  employee: string;
  customer: string;
  service: string;
  start: string;
  status: string;
}
