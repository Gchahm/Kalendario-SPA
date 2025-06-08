import {TestBed} from '@angular/core/testing';
import {CanViewServicesGuard} from './can-view-services.guard';
import {User} from '@api/models';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {cold} from 'jasmine-marbles';


describe('CanViewServicesGuard', () => {
  let guard: CanViewServicesGuard;
  let store: MockStore;
  const initialState = { core: {user: User.AnonymousUser()} };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CanViewServicesGuard,
        provideMockStore({initialState}),
      ]
    });

    store = TestBed.inject(MockStore);
    guard = TestBed.inject(CanViewServicesGuard);
  });

  describe('canActivate', () => {
    it('should return false if the user state is not logged in', () => {
      const expected = cold('a', {a: false});

      expect(guard.canActivate(null, null)).toBeObservable(expected);
    });

    it('should return false if the user does not have access to services', () => {
      const user = User.fromJs();
      store.setState({ core: {user} });

      const expected = cold('a', {a: false});

      expect(guard.canActivate(null, null)).toBeObservable(expected);
    });

    it('should return true if the user has access to services', () => {
      const user = User.fromJs({permissions: ['scheduling.view_service']});
      store.setState({ core: {user} });

      const expected = cold('a', {a: true});

      expect(guard.canActivate(null, null)).toBeObservable(expected);
    });
  });
});
