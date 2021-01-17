import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GroupFormComponent } from './group-form.component';
import {provideMockStore} from '@ngrx/store/testing';

describe('GroupFormComponent', () => {
  let component: GroupFormComponent;
  let fixture: ComponentFixture<GroupFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupFormComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupFormComponent);
    component = fixture.componentInstance;
    component.permissions = [];
    component.model = {id: 1, name: '', permissions: []};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
