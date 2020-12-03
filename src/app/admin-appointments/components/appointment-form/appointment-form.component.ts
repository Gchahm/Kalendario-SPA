import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BaseFormComponent} from '@shared/common/BaseFormComponent';
import {IAppointment, Employee, IAppointmentWriteModel, Service} from '@api/models';
import {modelId} from '@api/models/IReadModel';
import {FormControl} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Moment} from 'moment';
import {pulseAnimation} from 'angular-animations';
import {AppointmentPermissions} from '@api/permissions';
import * as moment from 'moment';

@Component({
  selector: 'admin-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss'],
  animations: [pulseAnimation({scale: 1.2, duration: 200})]
})
export class AppointmentFormComponent extends BaseFormComponent<IAppointment> implements OnInit, OnDestroy {

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
      start: moment(this.model.start),
      end: moment(this.model.end),
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
    });
  }

  private subscribeOnStartChanges() {
    this.startSub = this.form.get('start').valueChanges.subscribe((start: Moment) => {
      // Update form start hours / minutes from form control start time
      start.set(getHours(this.startTimeControlValue()));
      // Update end datetime based on the new start date and the end time control
      this.form.patchValue({end: moment(start).set(getHours(this.endTimeControlValue()))});
    });
  }


  private subscribeOnStartTimeChanges() {
    this.startTimeSub = this.form.get('startTime').valueChanges.subscribe(startTime => {
      this.startControlValue().set(getHours(startTime));
      this.updateEndTimeFromService(+this.serviceControl.value);
    });
  }

  private subscribeOnEndTimeChanges() {
    this.endTimeSub = this.form.get('endTime').valueChanges.subscribe(endTime => {
      this.endControlValue().set(getHours(endTime));
    });
  }

  private subscribeOnEmployeeChanges() {
    this.employeeSubscription = this.form.get('employee')
      .valueChanges.subscribe(e => this.setEmployeeServices(+e));
  }

  private startControlValue(): Moment {
    return this.form.get('start').value;
  }

  private endControlValue(): Moment {
    return this.form.get('end').value;
  }

  private startTimeControlValue(): string {
    return this.form.get('startTime').value;
  }

  private endTimeControlValue(): string {
    return this.form.get('endTime').value;
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
      const end = moment(this.startControlValue())
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

function getHours(startTime: string): { hours: number, minutes: number } {
  const hours = +startTime.substring(0, 2);
  const minutes = +startTime.substring(3, 5);
  return {hours, minutes};
}
