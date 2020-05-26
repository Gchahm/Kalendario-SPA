import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {IReadModel} from '@core/models/interfaces/IReadModel';
import {Observable, Subscription} from 'rxjs';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '@app/Store';
import {SELECT_MODEL, TOGGLE_EDIT} from '../../AdminActions';
import {AlerterService} from '@shared/services/alerter.service';

@Component({
  selector: 'model-list-container',
  templateUrl: './model-list-container.component.html',
  styleUrls: ['./model-list-container.component.scss']
})
export class ModelListContainerComponent implements OnInit, OnDestroy {

  @select((s: IAppState) => s.admin.selectedModel) selectedModel$;
  @select((s: IAppState) => s.admin.dashboardState.editMode) editMode$;
  @select((s: IAppState) => s.core.isMobileView) mobileView$;
  @Input() modelList$: Observable<IReadModel[]>;
  @Output() create = new EventEmitter();
  @Output() delete = new EventEmitter<IReadModel>();
  subscription: Subscription;
  tabIndex = 0;

  // TODO: Desirable that when on mobile view the mat tab header stays on tob when scrolling down
  constructor(public redux: NgRedux<IAppState>,
              public alerter: AlerterService) {}

  ngOnInit() {
    this.subscription = this.modelList$.subscribe(l => {
      if (l.length > 0) {
        this.redux.dispatch({type: SELECT_MODEL, model: l[0]});
      } else
        {
        this.redux.dispatch({type: SELECT_MODEL, model: null});
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectModel(model: IReadModel) {
    this.redux.dispatch({type: SELECT_MODEL, model});
    this.tabIndex = 1;
  }

  onCreate() {
    this.create.emit();
  }

  onEdit() {
    this.redux.dispatch({type: TOGGLE_EDIT});
  }

  onDelete() {
    const model = this.redux.getState().admin.selectedModel;
    this.alerter.warn('Are you sure?', `this will permanently delete ${model}`)
      .toPromise()
      .then(res => {
        if (res) {
          this.delete.emit(model);
        }
      })
  }

}
