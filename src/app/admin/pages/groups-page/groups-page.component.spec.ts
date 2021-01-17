import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {GroupsPageComponent} from './groups-page.component';
import {provideMockStore} from '@ngrx/store/testing';
import * as fromGroups from '@admin/state/groups';

describe('GroupsPageComponent', () => {
  let component: GroupsPageComponent;
  let fixture: ComponentFixture<GroupsPageComponent>;
  const initialState = {
    [fromGroups.storeName]: fromGroups.initialState,
    core: {isMobile: false}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupsPageComponent],
      providers: [
        provideMockStore({initialState}),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
