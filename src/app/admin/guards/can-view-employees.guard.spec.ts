import {TestBed} from '@angular/core/testing';
import {CanViewEmployeesGuard} from './can-view-employees.guard';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {User} from '@api/models';
import { cold } from 'jasmine-marbles';


describe('CanViewEmployeesGuard', () => {
  let guard: CanViewEmployeesGuard;
  let store: MockStore;
  const initialState = { core: {user: User.AnonymousUser()} };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CanViewEmployeesGuard,
        provideMockStore({initialState}),
      ]
    });

    store = TestBed.inject(MockStore);
    guard = TestBed.inject(CanViewEmployeesGuard);
  });

  describe('canActivate', () => {
    it('should return false if the user state is not logged in', () => {
      const expected = cold('a', {a: false});

      expect(guard.canActivate(null, null)).toBeObservable(expected);
    });

    it('should return false if the user does not have access to employees', () => {
      const user = User.fromJs();
      store.setState({ core: {user} });

      const expected = cold('a', {a: false});

      expect(guard.canActivate(null, null)).toBeObservable(expected);
    });

    it('should return true if the user has access to employees', () => {
      const user = User.fromJs({permissions: ['scheduling.view_employee']});
      store.setState({ core: {user} });

      const expected = cold('a', {a: true});

      expect(guard.canActivate(null, null)).toBeObservable(expected);
    });
  });

});
