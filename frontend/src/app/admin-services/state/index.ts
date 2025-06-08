import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';
import * as fromReducer from './services.reducer';

import {storeName} from './services.actions';
import * as fromServiceCategories from '@app/admin-services/state/categories';
import {Service, ServiceCategory} from '@api/models';
export {State, reducer} from './services.reducer';
export {actions, storeName} from './services.actions';


const getFeature = createFeatureSelector<fromReducer.State>(storeName);


const baseSelectors = fromReducer.adapter.getBaseSelectors(getFeature,
  (e, s: string) => e.name.toLowerCase().includes(s.toLowerCase()));

export interface ServiceFullModel extends Service {
  categoryModel: ServiceCategory;
}

const getServiceFullModels: MemoizedSelector<object, ServiceFullModel[]> = createSelector(
  baseSelectors.selectAll,
  fromServiceCategories.selectors.selectAll,
  (services, categories) => services.map(s => ({...s, categoryModel: categories.find(c => c.id === s.category)}))
);

const getCurrentServiceFullModel: MemoizedSelector<object, ServiceFullModel> = createSelector(
  getServiceFullModels,
  baseSelectors.getCurrentId,
  (services, id) => {
    if (id === 0) {
      const s = Service.CreateModel();
      return {...s, categoryModel: null};
    }
    return services.find(s => s.id === id);
  }
);

const getServiceCategorized = createSelector(
  baseSelectors.getFilteredEntities,
  fromServiceCategories.selectors.selectAll,
  (services, categories) => {
    if (!services || !categories) {
      return {};
    }
    const result = {'no category': services.filter(service => service.category === null || service.category === 0)};
    for (const category of categories) {
      const filtered = services.filter(service => service.category === category.id);
      if (filtered.length > 0) {result[category.name] = filtered; }
    }
    return result;
  }
);



export const selectors = {
  ...baseSelectors,
  getServiceCategorized,
  getServiceFullModels,
  getCurrentServiceFullModel
};
