import {Component, Input} from '@angular/core';
import {IReadModel} from '@api/models';

@Component({
  selector: 'app-model-list-details',
  templateUrl: './model-list-details.component.html',
  styleUrls: ['./model-list-details.component.css']
})
export class ModelListDetailsComponent {

  @Input() selectedModel: IReadModel;
  @Input() editMode: boolean;

  @Input() noSelectionTitle: string;
  @Input() noSelectionText: string;

  get showContent(): boolean {
    return (this.selectedModel && this.selectedModel.id > 0) || this.editMode;
  }
}
