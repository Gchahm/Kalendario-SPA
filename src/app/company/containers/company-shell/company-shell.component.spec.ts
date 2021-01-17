import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {CompanyShellComponent} from '@company/containers/company-shell/company-shell.component';

describe('CompanyComponent', () => {
  let component: CompanyShellComponent;
  let fixture: ComponentFixture<CompanyShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [CompanyShellComponent],
      providers: [
        {provide: ActivatedRoute, useValue: {snapshot: {paramMap: convertToParamMap({cid: 1})}}},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
