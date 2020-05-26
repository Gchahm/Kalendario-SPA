import {Component} from '@angular/core';
import {ServiceService} from '../../../services/service.service';
import {Service} from '@core/models/Service';
import {CreateServiceDialogComponent} from '../../_dialogs/create-service/create-service-dialog.component';
import {BaseListComponent} from '../BaseListComponent';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '@app/Store';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-services-admin-page',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.scss']
})
export class ServicesPageComponent extends BaseListComponent<Service> {

  @select((store: IAppState) => store.admin.services) modelList$;

  constructor(serviceService: ServiceService,
              dialog: MatDialog,
              redux: NgRedux<IAppState>) {
    super(serviceService, dialog, CreateServiceDialogComponent, redux);
  }
}
