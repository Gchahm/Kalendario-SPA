import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyLogoShellComponent } from './company-logo-shell.component';

describe('CompanyLogoShellComponent', () => {
  let component: CompanyLogoShellComponent;
  let fixture: ComponentFixture<CompanyLogoShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyLogoShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyLogoShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
