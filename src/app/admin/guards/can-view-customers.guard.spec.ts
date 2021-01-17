import {TestBed} from '@angular/core/testing';
import {CanViewCustomersGuard} from './can-view-customers.guard';
import {User} from '@api/models';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {cold} from 'jasmine-marbles';

describe('CanViewCustomersGuard', () => {
  let guard: CanViewCustomersGuard;
  let store: MockStore;
  const initialState = { core: {user: User.AnonymousUser()} };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CanViewCustomersGuard,
        provideMockStore({initialState}),
      ]
    });

    store = TestBed.inject(MockStore);
    guard = TestBed.inject(CanViewCustomersGuard);
  });

  describe('canActivate', () => {
    it('should return false if the user state is not logged in', () => {
      const expected = cold('a', {a: false});

      expect(guard.canActivate(null, null)).toBeObservable(expected);
    });

    it('should return false if the user does not have access to customers', () => {
      const user = User.fromJs();
      store.setState({ core: {user} });

      const expected = cold('a', {a: false});

      expect(guard.canActivate(null, null)).toBeObservable(expected);
    });

    it('should return true if the user has access to customers', () => {
      const user = User.fromJs({permissions: ['scheduling.view_customer']});
      store.setState({ core: {user} });

      const expected = cold('a', {a: true});

      expect(guard.canActivate(null, null)).toBeObservable(expected);
    });
  });
});
