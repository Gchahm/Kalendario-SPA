import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CompanyShellComponent} from './company.component';
import {NgReduxTestingModule} from '@angular-redux/store/testing';
import {ActivatedRoute, convertToParamMap} from '@angular/router';

describe('CompanyComponent', () => {
  let component: CompanyShellComponent;
  let fixture: ComponentFixture<CompanyShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgReduxTestingModule
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
