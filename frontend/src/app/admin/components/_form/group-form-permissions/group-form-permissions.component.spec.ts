import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupFormPermissionsComponent } from './group-form-permissions.component';

describe('GroupFormPermissionsComponent', () => {
  let component: GroupFormPermissionsComponent;
  let fixture: ComponentFixture<GroupFormPermissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupFormPermissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupFormPermissionsComponent);
    component = fixture.componentInstance;
    component.models = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
