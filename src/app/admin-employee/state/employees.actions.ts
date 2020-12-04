import {BaseEntityActions, createActions} from '@shared/state/base/actions';
import {IEmployee} from '@api/models';
import {ActionCreator, createAction, props} from '@ngrx/store';
import {TypedAction} from '@ngrx/store/src/models';
import {ImageSnippet} from '@shared/components/image-input/image-input.component';


export const storeName = 'adminEmployees';

interface EmployeesActions extends BaseEntityActions<IEmployee> {
  requestPhotoUpdate: ActionCreator<string, (props: {image: ImageSnippet}) => ({image: ImageSnippet} & TypedAction<string>)>,
}

export const actions: EmployeesActions = {
  ...createActions<IEmployee>(storeName),
  requestPhotoUpdate: createAction(`[${storeName}] Update Photos`, props<{image: ImageSnippet}>()),
};
