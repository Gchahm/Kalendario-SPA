import {IReadModel} from '../../../core/models/interfaces/IReadModel';
import {EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModelEvent} from '../../events/ModelEvent';
import {FormGroup} from '@angular/forms';

export abstract class BaseFormComponent <R extends IReadModel>  implements OnInit {

  @Input() htmlAction: string;
  @Input() model: R;
  @Input() showButtons = true;
  @Output() submitClicked = new EventEmitter<ModelEvent>();
  @Output() cancelClicked = new EventEmitter();

  form: FormGroup;

  onUpdateEvent: ModelEvent = {
    model: null,
    action: null
  };

  abstract submitModel();
  abstract createForm();

  ngOnInit() {
    this.onUpdateEvent.model = this.model.writeModel();
    this.onUpdateEvent.action = this.htmlAction;
    this.createForm();
  }

  submit() {
    this.onUpdateEvent.model = this.submitModel();
    this.submitClicked.emit(this.onUpdateEvent);
  }

  cancel() {
    this.cancelClicked.emit();
  }
}
