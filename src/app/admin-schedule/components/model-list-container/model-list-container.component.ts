import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {IReadModel} from '../../../core/models/interfaces/IReadModel';
import {Observable, Subscription} from 'rxjs';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '../../../Store';
import {SELECT_MODEL, TOGGLE_EDIT} from '../../AdminActions';

@Component({
  selector: 'model-list-container',
  templateUrl: './model-list-container.component.html',
  styleUrls: ['./model-list-container.component.css']
})
export class ModelListContainerComponent implements OnInit, OnDestroy {

  @select((s: IAppState) => s.admin.selectedModel) selectedModel$;
  @select((s: IAppState) => s.admin.dashboardState.editMode) editMode$;
  @Input() modelList$: Observable<IReadModel[]>;
  @Output() createClicked = new EventEmitter();
  subscription: Subscription;

  constructor(public redux: NgRedux<IAppState>) {}

  ngOnInit() {
    this.subscription = this.modelList$.subscribe(l => {
      if (l.length > 0) {
        this.redux.dispatch({type: SELECT_MODEL, model: l[0]});
      } else {
        this.redux.dispatch({type: SELECT_MODEL, model: null});
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectModel(model: IReadModel) {
    this.redux.dispatch({type: SELECT_MODEL, model});
  }

  createModelClicked() {
    this.createClicked.emit();
  }

  editButtonClicked() {
    this.redux.dispatch({type: TOGGLE_EDIT});
  }
}
