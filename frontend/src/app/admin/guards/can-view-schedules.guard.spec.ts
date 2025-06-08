import {TestBed} from '@angular/core/testing';
import {CanViewSchedulesGuard} from './can-view-schedules.guard';
import {User} from '@api/models';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {cold} from 'jasmine-marbles';

describe('CanViewSchedulesGuard', () => {
  let guard: CanViewSchedulesGuard;
  let store: MockStore;
  const initialState = { core: {user: User.AnonymousUser()} };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CanViewSchedulesGuard,
        provideMockStore({initialState}),
      ]
    });

    store = TestBed.inject(MockStore);
    guard = TestBed.inject(CanViewSchedulesGuard);
  });

  describe('canActivate', () => {
    it('should return false if the user state is not logged in', () => {
      const expected = cold('a', {a: false});

      expect(guard.canActivate(null, null)).toBeObservable(expected);
    });

    it('should return false if the user does not have access to schedules', () => {
      const user = User.fromJs();
      store.setState({ core: {user} });

      const expected = cold('a', {a: false});

      expect(guard.canActivate(null, null)).toBeObservable(expected);
    });

    it('should return true if the user has access to schedules', () => {
      const user = User.fromJs({permissions: ['scheduling.view_schedule']});
      store.setState({ core: {user} });

      const expected = cold('a', {a: true});

      expect(guard.canActivate(null, null)).toBeObservable(expected);
    });
  });
});
