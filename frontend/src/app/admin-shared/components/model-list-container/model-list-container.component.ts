import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AlerterService} from '@shared/services/alerter.service';
import {IReadModel} from '@api/models';

@Component({
  selector: 'model-list-container',
  templateUrl: './model-list-container.component.html',
  styleUrls: ['./model-list-container.component.scss'],
})
export class ModelListContainerComponent {
  @Input() mobileView: boolean;
  @Input() modelList: IReadModel[];
  @Input() categorizedList: { [key: string]: IReadModel[] };
  @Input() selectedModel: IReadModel;
  @Input() editMode: boolean;
  @Input() searchValue;
  @Input() noSelectionTitle = 'Nothing selected';
  @Input() noSelectionText = 'Please select an item from the list to the left to start browsing.';

  @Output() create = new EventEmitter();
  @Output() delete = new EventEmitter<IReadModel>();
  @Output() edit = new EventEmitter<boolean>();
  @Output() search = new EventEmitter<string>();
  @Output() selected = new EventEmitter<IReadModel>();

  constructor(public alerter: AlerterService) {
  }

  onDelete() {
    this.alerter.warn('Are you sure?', `this will permanently delete ${this.selectedModel.name}`)
      .toPromise()
      .then(res => {
        if (res) {
          this.delete.emit(this.selectedModel);
        }
      });
  }
}
