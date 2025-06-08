import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IReadModel} from '@api/models';

@Component({
  selector: 'app-model-list-mobile-container',
  templateUrl: './model-list-mobile-container.component.html',
  styleUrls: ['./model-list-mobile-container.component.scss']
})
export class ModelListMobileContainerComponent {
  @Input() mobileView: boolean;
  @Input() modelList: IReadModel[];
  @Input() categorizedList: { [key: string]: IReadModel[] };
  @Input() selectedModel: IReadModel;
  @Input() editMode: boolean;
  @Input() searchValue;
  @Input() noSelectionTitle: string;
  @Input() noSelectionText: string;

  @Output() create = new EventEmitter();
  @Output() delete = new EventEmitter<IReadModel>();
  @Output() edit = new EventEmitter<boolean>();
  @Output() search = new EventEmitter<string>();
  @Output() selected = new EventEmitter<IReadModel>();

  tabIndex = 0;

  selectModel(model: IReadModel) {
    this.tabIndex = 1;
    this.selected.emit(model);
  }
}
