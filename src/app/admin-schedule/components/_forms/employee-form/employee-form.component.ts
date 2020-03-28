import {Component} from '@angular/core';
import {Service} from '../../../../core/models/Service';
import {select} from '@angular-redux/store';
import {IAppState} from '../../../../Store';
import {Observable} from 'rxjs';
import {BaseFormComponent} from '../BaseFormComponent';
import {Schedule} from '../../../../core/models/Schedule';
import {Employee} from '../../../../core/models/Employee';
import {FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';
import {MatOptionSelectionChange} from '@angular/material/core';

@Component({
  selector: 'admin-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent extends BaseFormComponent<Employee> {

  @select((s: IAppState) => s.admin.services) services$: Observable<Service[]>;
  @select((s: IAppState) => s.admin.schedules) schedules$: Observable<Schedule[]>;

  constructor(public fb: FormBuilder) {
    super();
  }

  submitModel() {
    return this.form.value;
  }

  createForm() {
    const model = this.model.writeModel();
    this.form = this.fb.group({
      id: [model.id, Validators.required],
      first_name: [model.first_name, Validators.required],
      last_name: [model.last_name, Validators.required],
      instagram: [model.instagram, ],
      email: [model.email, Validators.required],
      phone: [model.phone, Validators.required],
      bio: [model.bio, ],
      services: this.fb.array(model.services.map(item => new FormControl(item))),
      schedule: [model.schedule, ],
    });
  }

  selectedServices() {
    return this.formServices().value;
  }

  formServices(): FormArray {
    return this.form.get('services') as FormArray;
  }

  hasControl(id): boolean {
    return this.formServices().controls.findIndex(c => c.value === id) !== -1;
  }

  logEvent(event: MatOptionSelectionChange) {
    if (event.source.selected && !this.hasControl(event.source.value)) {
      this.formServices().push(new FormControl(event.source.value));
    } else if (!event.source.selected && this.hasControl(event.source.value)) {
      this.formServices().removeAt(this.formServices().controls.findIndex(a => a.value === event.source.value));
    }
  }
}


