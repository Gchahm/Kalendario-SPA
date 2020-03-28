import {IReadModel} from '../../../core/models/interfaces/IReadModel';
import {Input} from '@angular/core';
import {select} from '@angular-redux/store';
import {IAppState} from '../../../Store';

export abstract class BaseDetailsComponent<R extends IReadModel> {
  @Input() model: R;
  @select((s: IAppState) => s.core.isMobileView) isMobile$;
  @select((s: IAppState) => s.core.isTabletView) isTablet$;
}
