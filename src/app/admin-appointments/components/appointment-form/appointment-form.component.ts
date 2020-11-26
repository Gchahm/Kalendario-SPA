import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BaseFormComponent} from '@shared/common/BaseFormComponent';
import {Appointment, Employee, IAppointmentWriteModel, Service} from '@api/models';
import {modelId} from '@api/models/IReadModel';
import {FormControl} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Moment} from 'moment';
import {pulseAnimation} from 'angular-animations';
import {AppointmentPermissions} from '@api/permissions';

@Component({
  selector: 'admin-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss'],
  animations: [pulseAnimation({scale: 1.2, duration: 200})]
})
export class AppointmentFormComponent extends BaseFormComponent<Appointment> implements OnInit, OnDestroy {

  @Input() employees: Employee[];
  @Input() permissions: AppointmentPermissions;

  private _services: Service[];
  @Input() set services(services: Service[]) {
    this._services = services;
    this.setEmployeeServices(this.model.employee.id);
  }

  get services(): Service[] {
    return this._services;
  }

  private serviceSub: Subscription;
  private endTimeSub: Subscription;
  private startTimeSub: Subscription;
  private startSub: Subscription;
  private employeeSubscription: Subscription;

  employeeServices: Service[];
  animationState = false;

  writeModel(): IAppointmentWriteModel {
    return {
      id: this.model.id,
      start: this.model.start,
      end: this.model.end,
      customer: modelId(this.model.customer),
      employee: modelId(this.model.employee),
      service: modelId(this.model.service),
      status: this.model.status,
      customerNotes: this.model.customerNotes,
      internalNotes: this.model.internalNotes,
      ignoreAvailability: false
    };
  }

  ngOnInit() {
    super.ngOnInit();
    this.subscribeOnServiceChanges();
    this.subscribeOnStartChanges();
    this.subscribeOnStartTimeChanges();
    this.subscribeOnEndTimeChanges();
    this.subscribeOnEmployeeChanges();
    this.setEmployeeServices(this.model.employee.id);
  }


  ngOnDestroy() {
    this.serviceSub.unsubscribe();
    this.startSub.unsubscribe();
    this.startTimeSub.unsubscribe();
    this.endTimeSub.unsubscribe();
    this.employeeSubscription.unsubscribe();
  }

  createForm() {
    super.createForm();
    const writeModel = this.writeModel();
    this.form.addControl('startTime', new FormControl(writeModel.start.format('HH:mm')));
    this.form.addControl('endTime', new FormControl(writeModel.end.format('HH:mm')));
  }

  canChangeEmployee(): boolean {
    if (!this.employees || this.employees.length === 0) {
      return false;
    }
    return !this.model.request || (!!this.model.request && !this.model.lockEmployee);
  }

  private subscribeOnServiceChanges() {
    this.serviceSub = this.serviceControl.valueChanges.subscribe(sid => {
        this.updateEndTimeFromService(+sid);
      }
    );
  }

  private subscribeOnStartChanges() {
    this.startTimeSub = this.form.get('start').valueChanges.subscribe((start: Moment) => {
        const hours = this.endControlValue().hours();
        const minutes = this.endControlValue().minutes();
        this.form.patchValue({
          end: start.set({hours, minutes})
        });
      }
    );
  }

  private subscribeOnStartTimeChanges() {
    this.startTimeSub = this.form.get('startTime').valueChanges.subscribe(startTime => {
        const hours = +startTime.substring(0, 2);
        const minutes = +startTime.substring(3, 5);
        this.form.patchValue({
          start: this.startControlValue().set({hours, minutes}),
        });
        this.updateEndTimeFromService(+this.serviceControl.value);
      }
    );
  }

  private subscribeOnEndTimeChanges() {
    this.endTimeSub = this.form.get('endTime').valueChanges.subscribe(endTime => {
        const hours = +endTime.substring(0, 2);
        const minutes = +endTime.substring(3, 5);
        this.form.patchValue({
          end: this.endControlValue().set({hours, minutes})
        });
      }
    );
  }

  private subscribeOnEmployeeChanges() {
    this.employeeSubscription = this.form.get('employee')
      .valueChanges.subscribe(e => this.setEmployeeServices(+e));
  }

  private startControlValue(): Moment {
    return this.form.get('start').value.clone();
  }

  private endControlValue(): Moment {
    return this.form.get('end').value.clone();
  }

  private get serviceControl(): FormControl {
    return this.form.get('service') as FormControl;
  }

  private setEmployeeServices(empId: number) {
    const serviceIds = this.employees.find(e => e.id === empId).services;
    this.employeeServices = this.services.filter(s => serviceIds.includes(s.id));
  }

  private updateEndTimeFromService(serviceId: number) {
    const service = this.services.find(s => s.id === serviceId);
    if (service) {
      const end = this.startControlValue()
        .add(service.duration.hour, 'hours')
        .add(service.duration.minute, 'minutes');

      this.form.patchValue({
        end,
        endTime: end.format('HH:mm')
      });
      this.animationState = !this.animationState;
    }
  }
}

