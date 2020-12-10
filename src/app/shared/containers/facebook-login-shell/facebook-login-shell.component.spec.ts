import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookLoginShellComponent } from './facebook-login-shell.component';

describe('FacebookLoginShellComponent', () => {
  let component: FacebookLoginShellComponent;
  let fixture: ComponentFixture<FacebookLoginShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacebookLoginShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacebookLoginShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
