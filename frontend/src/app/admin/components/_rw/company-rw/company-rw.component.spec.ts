import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyRwComponent } from './company-rw.component';

describe('CompanytDetailsComponent', () => {
  let component: CompanyRwComponent;
  let fixture: ComponentFixture<CompanyRwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyRwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyRwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
