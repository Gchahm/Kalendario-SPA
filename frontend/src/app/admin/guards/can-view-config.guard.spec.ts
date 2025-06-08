import { TestBed } from '@angular/core/testing';
import { CanViewConfigGuard } from './can-view-config.guard';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {User} from '@api/models';
import {cold} from 'jasmine-marbles';

describe('CanViewConfigGuard', () => {
  let guard: CanViewConfigGuard;
  let store: MockStore;
  const initialState = { core: {user: User.AnonymousUser()} };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CanViewConfigGuard,
        provideMockStore({initialState}),
      ]
    });

    store = TestBed.inject(MockStore);
    guard = TestBed.inject(CanViewConfigGuard);
  });

  describe('canActivate', () => {
    it('should return false if the user state is not logged in', () => {
      const expected = cold('a', {a: false});

      expect(guard.canActivate(null, null)).toBeObservable(expected);
    });

    it('should return false if the user does not have access to config', () => {
      const user = User.fromJs();
      store.setState({ core: {user} });

      const expected = cold('a', {a: false});

      expect(guard.canActivate(null, null)).toBeObservable(expected);
    });

    it('should return true if the user has access to config', () => {
      const user = User.fromJs({permissions: ['scheduling.view_company']});
      store.setState({ core: {user} });

      const expected = cold('a', {a: true});

      expect(guard.canActivate(null, null)).toBeObservable(expected);
    });
  });
});
