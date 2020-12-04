import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AlerterService} from '@shared/services/alerter.service';
import {IReadModel} from '@api/models';
import {expandCollapseAnimation} from '@app/animations';

@Component({
  selector: 'model-list-container',
  templateUrl: './model-list-container.component.html',
  styleUrls: ['./model-list-container.component.scss'],
  animations: [expandCollapseAnimation]
})
export class ModelListContainerComponent {

  @Input() mobileView: boolean;
  @Input() modelList: IReadModel[];
  @Input() categorizedList: { [key: string]: IReadModel[] };
  @Input() selectedModel: IReadModel;
  @Input() editMode: boolean;
  @Input() noSelectionTitle = 'Nothing selected';
  @Input() noSelectionText = 'Please select an item from the list to the left to start browsing.';

  searchVal: string;
  @Input() set searchValue(value: string) {
    this.searchVal = value;
  }

  @Output() create = new EventEmitter();
  @Output() delete = new EventEmitter<IReadModel>();
  @Output() edit = new EventEmitter<boolean>();
  @Output() search = new EventEmitter<string>();
  /**Tab index is used to control what is shpowing on mobile view.
   * It allows the select model function to show the details right after a select click*/
  tabIndex = 0;

  @Output() selected = new EventEmitter<IReadModel>();
  hiddenCategories: string[] = [];

  constructor(public alerter: AlerterService) {
  }

  get showContent(): boolean {
    return (this.selectedModel && this.selectedModel.id > 0) || this.editMode;
  }

  categories(): string[] {
    return Object.keys(this.categorizedList);
  }

  selectModel(model: IReadModel) {
    this.tabIndex = 1;
    this.selected.emit(model);
  }

  onCreate() {
    this.create.emit();
  }

  toggleEdit() {
    this.edit.emit(true);
  }

  isSelected(model: IReadModel): boolean {
    return !this.selectedModel ? null : model.id === this.selectedModel.id;
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

  searchChange() {
    this.search.emit(this.searchVal);
  }

  showItems(category: string): boolean {
    return !this.hiddenCategories.includes(category);
  }

  showHideCategory(category: string) {
    const index = this.hiddenCategories.indexOf(category);
    if (index >= 0) {
      this.hiddenCategories.splice(index, 1);
    } else {
      this.hiddenCategories.push(category);
    }
  }
}
