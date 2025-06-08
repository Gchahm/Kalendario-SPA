import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigRwComponent } from './config-rw.component';

describe('ConfigDetailsComponent', () => {
  let component: ConfigRwComponent;
  let fixture: ComponentFixture<ConfigRwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigRwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigRwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
