import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRwComponent } from './user-rw.component';

describe('UserRwComponent', () => {
  let component: UserRwComponent;
  let fixture: ComponentFixture<UserRwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
