import {Component, OnInit} from '@angular/core';
import {Company, ICompanyWriteModel} from '@api/models';
import {BaseRWComponent} from '@shared/common/BaseRWComponent';

@Component({
  selector: 'admin-company-rw',
  templateUrl: './company-rw.component.html',
  styleUrls: ['./company-rw.component.css']
})
export class CompanyRwComponent extends BaseRWComponent<Company> {
  writeModel(): ICompanyWriteModel {
    return {
      id: this.model.id,
      name: this.model.name,
      address: this.model.address,
      about: this.model.about,
      instagram: this.model.instagram,
      phoneNumber: this.model.phoneNumber,
      whatsapp: this.model.whatsapp,
      facebook: this.model.facebook
    };
  }
}
