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
export class ServicesPageComponent extends ListComponent implements OnInit, OnDestroy {

  services: Service[];
  subscription: Subscription;
  breakpoint = 0;

  constructor(private serviceService: ServiceService,
              public globals: Globals,
              toast: ToastService,
              dialog: MatDialog) {
    super(serviceService, dialog, CreateServiceDialogComponent, toast);
  }

  ngOnInit() {
    this.subscription = this.serviceService.get().subscribe(s => this.services = s);
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 6;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onModelCreate(response) {
    this.services.push(response);
  }

  dialogData() {
    return null;
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 6;
  }
}
