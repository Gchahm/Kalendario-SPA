import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MenuOption} from '../../models/MenuOption';
import {IReadModel} from '../../../core/models/interfaces/IReadModel';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  sideOpen = true;
  options: MenuOption[] = [
    {name: 'Employee', link: '/admin/employees'},
    {name: 'Services', link: '/admin/services'},
    {name: 'Shifts', link: '/admin/shifts'},
    {name: 'Schedules', link: '/admin/schedules'}
  ];

  @Input() modelList: IReadModel[];
  @Input() selectedModel: IReadModel;
  @Output() selectedModelChange: EventEmitter<IReadModel> = new EventEmitter<IReadModel>();
  @Output() createClicked = new EventEmitter();

  selectModel(id: number) {
    this.selectedModel = this.modelList.find(value => value.id === id);
    this.selectedModelChange.emit(this.selectedModel);
  }

  createModelClicked() {
    this.createClicked.emit();
  }
}
