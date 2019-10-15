import {EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UpdateModelEvent} from './UpdateModelEvent';
import {IReadModel} from '../../models/interfaces/IReadModel';

export abstract class DetailsComponent implements OnInit {

  @Input() model: IReadModel;
  @Output() onUpdate = new EventEmitter<UpdateModelEvent>();

  onUpdateEvent: UpdateModelEvent = {
    model: null,
    onSuccess: (model: IReadModel) => {
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

  save() {
    this.onUpdate.emit(this.onUpdateEvent);
  }
}
