import {Component, OnDestroy, OnInit} from '@angular/core';
import {BaseFormComponent} from '@shared/common/BaseFormComponent';
import {Appointment, IAppointmentWriteModel} from '@api/models';
import {modelId} from '@api/models/IReadModel';
import {FormControl} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Moment} from 'moment';

@Component({
  selector: 'admin-self-appointment-form',
  templateUrl: './self-appointment-form.component.html',
  styleUrls: ['./self-appointment-form.component.scss']
})
export class SelfAppointmentFormComponent extends BaseFormComponent<Appointment> implements OnInit, OnDestroy {
  private endTimeSub: Subscription;
  private startTimeSub: Subscription;


  ngOnInit() {
    super.ngOnInit();
    this.subscribeOnEndTimeChanges();
    this.subscribeOnStartTimeChanges();
  }


  ngOnDestroy() {
    this.endTimeSub.unsubscribe();
    this.startTimeSub.unsubscribe();
  }

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
    };
  }

  createForm() {
    super.createForm();
    const writeModel = this.writeModel();
    this.form.addControl('startTime', new FormControl(writeModel.start.format('HH:mm')));
    this.form.addControl('endTime', new FormControl(writeModel.end.format('HH:mm')));
  }

  private subscribeOnEndTimeChanges() {
    this.startTimeSub = this.form.get('startTime').valueChanges.subscribe(endTime => {
        const hours = +endTime.substring(0, 2);
        const minutes = +endTime.substring(3, 5);
        this.form.patchValue({
          start: this.startControlValue().set({hours, minutes})
        });
      }
    );
  }

  private subscribeOnStartTimeChanges() {
    this.endTimeSub = this.form.get('endTime').valueChanges.subscribe(endTime => {
        const hours = +endTime.substring(0, 2);
        const minutes = +endTime.substring(3, 5);
        this.form.patchValue({
          end: this.endControlValue().set({hours, minutes})
        });
      }
    );
  }

  private startControlValue(): Moment {
    return this.form.get('start').value.clone();
  }

  private endControlValue(): Moment {
    return this.form.get('end').value.clone();
  }
}
