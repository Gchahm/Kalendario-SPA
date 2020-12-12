import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookConnectShellComponent } from './facebook-connect-shell.component';

describe('FacebookConnectShellComponent', () => {
  let component: FacebookConnectShellComponent;
  let fixture: ComponentFixture<FacebookConnectShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacebookConnectShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacebookConnectShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
