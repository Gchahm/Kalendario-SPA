import {EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HTMLAction, UpdateModelEvent} from './UpdateModelEvent';
import {IReadModel} from '../../models/interfaces/IReadModel';


export abstract class DetailsComponent<R extends IReadModel> implements OnInit {

  @Input() model: R;
  @Output() onUpdate = new EventEmitter<UpdateModelEvent>();

  onUpdateEvent: UpdateModelEvent = {
    action: HTMLAction.patch,
    model: null,
    onSuccess: (model: R) => {
      this.model = model;
      this.onUpdateEvent.model = model.writeModel();
      this.editMode = false;
    },
    onFail: (err) => this.editMode = false
  };

  editMode = false;

  ngOnInit() {
    this.onUpdateEvent.model = this.model.writeModel();
  }

  edit() {
    this.onUpdateEvent.model = this.model.writeModel();
    this.onUpdateEvent.action = HTMLAction.patch;
    this.editMode = true;
  }

  cancel() {
    this.onUpdateEvent.model = this.model.writeModel();
    this.editMode = false;
  }

  delete() {
    this.onUpdateEvent.model = this.model.writeModel();
    this.onUpdateEvent.action = HTMLAction.delete;
    this.onUpdate.emit(this.onUpdateEvent);
  }

  save() {
    this.onUpdate.emit(this.onUpdateEvent);
  }
}
