import {EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UpdateModelEvent} from './UpdateModelEvent';
import {IReadModel} from '../../models/interfaces/IReadModel';

export abstract class DetailsComponent<R extends IReadModel> implements OnInit {

  @Input() model: R;
  @Output() onUpdate = new EventEmitter<UpdateModelEvent>();

  onUpdateEvent: UpdateModelEvent = {
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
    this.editMode = true;
  }

  save() {
    this.onUpdate.emit(this.onUpdateEvent);
  }
}
