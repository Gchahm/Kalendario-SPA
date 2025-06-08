import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewShellComponent } from './user-view-shell.component';

describe('UserViewShellComponent', () => {
  let component: UserViewShellComponent;
  let fixture: ComponentFixture<UserViewShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserViewShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
