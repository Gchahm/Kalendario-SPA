import {Component, OnDestroy, OnInit} from '@angular/core';
import {ServiceService} from '../../services/service.service';
import {Subscription} from 'rxjs';
import {Service} from '../../../core/models/Service';
import {ListComponent} from '../../../core/generics/components/ListComponent';
import {Globals} from '../../../core/services/Globals';
import {ToastService} from '../../../shared/services/toast.service';
import {MatDialog} from '@angular/material';
import {CreateServiceDialogComponent} from '../../dialogs/create-service/create-service-dialog.component';

@Component({
  selector: 'app-services-admin-page',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.css']
})
export class ServicesPageComponent extends ListComponent<Service> implements OnInit, OnDestroy {


  constructor(private serviceService: ServiceService,
              public globals: Globals,
              toast: ToastService,
              dialog: MatDialog) {
    super(serviceService, dialog, CreateServiceDialogComponent, toast);
  }

  ngOnInit() {
    this.subscription = this.serviceService.get().subscribe((services: Service[]) => {
      this.loadModels(services);
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  dialogData() {
    return null;
  }
}