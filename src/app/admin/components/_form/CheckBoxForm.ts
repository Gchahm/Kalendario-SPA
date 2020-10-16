import {EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IReadModel} from '@api/models';
import {MatCheckboxChange} from '@angular/material/checkbox';

export abstract class CheckBoxForm<T extends IReadModel> implements OnInit {
  @Input() models: T[];
  @Input() checked: number[];
  @Output() changed = new EventEmitter<CheckChanged>();
  grouped: Grouped<T>;

  abstract modelField(model: T): string;

  ngOnInit() {
    this.grouped = {};
    for (const model of this.models) {
      if (this.grouped.hasOwnProperty(this.modelField(model))) {
        this.grouped[this.modelField(model)].push(this.boxItem(model));
      } else {
        this.grouped[this.modelField(model)] = [this.boxItem(model)];
      }
    }
  }

  emitChanged(event: MatCheckboxChange) {
    this.changed.emit({checked: event.checked, id: +event.source.id});
  }

  boxItem(model: T): BoxItem<T> {
    return {
      checked: this.checked.includes(model.id),
      model
    };
  }

  allChecked(name: string) {
    return this.grouped[name].every(item => item.checked);
  }

  groupChecked(name) {
    if (this.allChecked(name)) {
      this.grouped[name].forEach(item => item.checked = false);
    } else {
      this.grouped[name].forEach(item => item.checked = true);
    }
    this.grouped[name].forEach(item => {
      this.changed.emit({checked: item.checked, id: item.model.id});
    });
  }

  keys() {
    return Object.keys(this.grouped);
  }
}

export interface CheckChanged {
  id: number;
  checked: boolean;
}

interface BoxItem<T> {
  checked: boolean;
  model: T;
}

interface Grouped<T> {
  [key: string]: BoxItem<T>[];
}
