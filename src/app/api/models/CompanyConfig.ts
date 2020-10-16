import {Injectable} from '@angular/core';
import {Adapter} from '../adapter';
import {IReadModel} from './IReadModel';


export class CompanyConfig implements IReadModel {
  static modelType = 'companyMessages';
  name = '';
  ownerId = 0;
  private: boolean;
  preBookWarn = '';
  postBookMessage = '';
  postBookEmailMessage = '';
  appointmentReminderMessage = '';
  appointmentAcceptedMessage = '';
  appointmentRejectedMessage = '';
  allowCardPayment: boolean;
  allowUnpaidRequest: boolean;
  canReceiveCardPayments: boolean;
  canReceiveUnpaidRequest: boolean;

  get id() {
    return this.ownerId;
  }

  set id(v) {
    this.ownerId = v;
  }

  static fromJs(data: any): CompanyConfig {
    data = typeof data === 'object' ? data : {};
    const result = new CompanyConfig();
    if (data) {
      result.ownerId = data.ownerId;
      result.private = data.private;
      result.preBookWarn = data.preBookWarn;
      result.postBookMessage = data.postBookMessage;
      result.postBookEmailMessage = data.postBookEmailMessage;
      result.appointmentReminderMessage = data.appointmentReminderMessage;
      result.appointmentAcceptedMessage = data.appointmentAcceptedMessage;
      result.appointmentRejectedMessage = data.appointmentRejectedMessage;
      result.allowCardPayment = data.allowCardPayment;
      result.allowUnpaidRequest = data.allowUnpaidRequest;
      result.canReceiveCardPayments = data.canReceiveCardPayments;
      result.canReceiveUnpaidRequest = data.canReceiveUnpaidRequest;
    }
    return result;
  }


}

@Injectable({
  providedIn: 'root'
})
export class ConfigAdapter implements Adapter<CompanyConfig> {
  adapt(data: any): CompanyConfig {
    return CompanyConfig.fromJs(data);
  }
}

export interface IConfigWriteModel {
  ownerId: number;
  private: boolean;
  preBookWarn: string;
  postBookMessage: string;
  postBookEmailMessage: string;
  appointmentReminderMessage: string;
  appointmentAcceptedMessage: string;
  appointmentRejectedMessage: string;
  allowCardPayment: boolean;
  allowUnpaidRequest: boolean;
}
