import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AlerterService} from '@shared/services/alerter.service';
import {IReadModel} from '@api/models';

@Component({
  selector: 'model-list-container',
  templateUrl: './model-list-container.component.html',
  styleUrls: ['./model-list-container.component.scss']
})
export class ModelListContainerComponent {

  @Input() mobileView: boolean;
  @Input() modelList: IReadModel[];
  @Input() categorizedList: { [key: string]: IReadModel[] };
  @Input() selectedModel: IReadModel;
  @Input() editMode: boolean;

  searchVal: string;
  @Input() set searchValue(value: string) {
    this.searchVal = value;
  };

  @Output() create = new EventEmitter();
  @Output() delete = new EventEmitter<IReadModel>();
  @Output() edit = new EventEmitter<boolean>();
  @Output() search = new EventEmitter<string>();
  /**Tab index is used to control what is shpowing on mobile view.
   * It allows the select model function to show the details right after a select click*/
  tabIndex = 0;

  @Output() selected = new EventEmitter<IReadModel>();


  constructor(public alerter: AlerterService) {
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

  searchChange(){
    this.search.emit(this.searchVal);
  }

}
