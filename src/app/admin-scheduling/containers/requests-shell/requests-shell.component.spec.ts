import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsShellComponent } from './requests-shell.component';

describe('RequestsPageComponent', () => {
  let component: RequestsShellComponent;
  let fixture: ComponentFixture<RequestsShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
