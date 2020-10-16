import { Component } from '@angular/core';
import {CompanyConfig, IConfigWriteModel} from '@api/models';
import {BaseRWComponent} from '@shared/common/BaseRWComponent';


@Component({
  selector: 'admin-config-rw',
  templateUrl: './config-rw.component.html',
  styleUrls: ['./config-rw.component.css']
})
export class ConfigRwComponent extends BaseRWComponent<CompanyConfig> {
  writeModel(): Partial<IConfigWriteModel> {
    return {
      ownerId: this.model.ownerId,
      preBookWarn: this.model.preBookWarn,
      postBookMessage: this.model.postBookMessage,
      postBookEmailMessage: this.model.postBookEmailMessage,
      appointmentReminderMessage: this.model.appointmentReminderMessage,
      appointmentAcceptedMessage: this.model.appointmentAcceptedMessage,
      appointmentRejectedMessage: this.model.appointmentRejectedMessage,
    };
  }
}
