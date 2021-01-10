import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IReadModel} from '@api/models';
import {expandCollapseAnimation} from '@app/animations';

@Component({
  selector: 'app-model-list-items',
  templateUrl: './model-list-items.component.html',
  styleUrls: ['./model-list-items.component.scss'],
  animations: [expandCollapseAnimation]
})
export class ModelListItemsComponent {
  @Input() editMode: boolean;
  @Input() mobileView: boolean;
  @Input() modelList: IReadModel[];
  @Input() selectedModel: IReadModel;

  _searchValue: string;

  @Input() set searchValue(value: string) {
    if (this._searchValue !== value) {
      this.search.emit(value);
      this._searchValue = value;
    }
  }

  get searchValue(): string {
    return this._searchValue;
  }

  private _categorizedList: { [key: string]: IReadModel[] };
  @Input() set categorizedList(items: { [key: string]: IReadModel[] }) {
    if (items) {
      this.categories = Object.keys(items);
      this._categorizedList = items;
    }
  }

  get categorizedList() {
    return this._categorizedList;
  }

  @Output() selected = new EventEmitter<IReadModel>();
  @Output() create = new EventEmitter();
  @Output() delete = new EventEmitter<void>();
  @Output() edit = new EventEmitter<boolean>();
  @Output() search = new EventEmitter<string>();

  hiddenCategories: string[] = [];
  categories: string[];

  showHideCategory(category: string) {
    const index = this.hiddenCategories.indexOf(category);
    if (index >= 0) {
      this.hiddenCategories.splice(index, 1);
    } else {
      this.hiddenCategories.push(category);
    }
  }

  showItems(category: string): boolean {
    return !this.hiddenCategories.includes(category);
  }
}

