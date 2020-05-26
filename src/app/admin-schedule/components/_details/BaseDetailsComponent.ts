import {IReadModel} from '@core/models/interfaces/IReadModel';
import {Input} from '@angular/core';
import {select} from '@angular-redux/store';
import {IAppState} from '@app/Store';

export abstract class BaseDetailsComponent<R extends IReadModel> {
  @Input()
  get model(): R {
    return this._model;
  };
  set model(m: R) {
    this.beforeSetModel();
    this._model = m;
    this.afterSetModel();
  }
  protected _model: R;

  beforeSetModel() {}
  afterSetModel() {}

  @select((s: IAppState) => s.core.isMobileView) isMobile$;
  @select((s: IAppState) => s.core.isTabletView) isTablet$;
}
