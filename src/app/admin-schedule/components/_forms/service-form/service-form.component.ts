import {Component} from '@angular/core';
import {Service} from '../../../../core/models/Service';
import {BaseFormComponent} from '../BaseFormComponent';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'admin-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.scss']
})
export class ServiceFormComponent extends BaseFormComponent<Service> {

  color;

  constructor(public fb: FormBuilder) {
    super();
  }

  submitModel() {
    this.form.patchValue({
      duration: this.formDuration(),
      color: this.color
    });
    return this.form.value;
  }

  createForm() {
    this.color = this.model.color;
    this.form = this.fb.group({
      id: [this.model.id, Validators.required],
      name: [this.model.name, Validators.required],
      duration: [this.model.duration.toString(), ],
      durationHours: [this.model.duration.hour, Validators.required],
      durationMinutes: [this.model.duration.minute, Validators.required],
      color: [this.model.color, Validators.required],
      description: [this.model.description, ],
    });
  }

  formDuration() {
    return this.form.get('durationHours').value + ':' + this.form.get('durationMinutes').value;
  }
}
