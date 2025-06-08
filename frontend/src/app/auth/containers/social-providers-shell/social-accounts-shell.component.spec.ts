import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialAccountsShellComponent } from './social-accounts-shell.component';

describe('SocialProvidersShellComponent', () => {
  let component: SocialAccountsShellComponent;
  let fixture: ComponentFixture<SocialAccountsShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialAccountsShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialAccountsShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
