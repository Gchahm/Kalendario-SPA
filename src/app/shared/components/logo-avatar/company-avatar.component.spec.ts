import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAvatarComponent } from './company-avatar.component';

describe('LogoAvatarComponent', () => {
  let component: CompanyAvatarComponent;
  let fixture: ComponentFixture<CompanyAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyAvatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
