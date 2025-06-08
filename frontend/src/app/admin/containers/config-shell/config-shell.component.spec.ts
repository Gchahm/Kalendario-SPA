import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigShellComponent } from './config-shell.component';
import * as fromConfig from '@admin/state/company';
import {provideMockStore} from '@ngrx/store/testing';

describe('ConfigPageComponent', () => {
  let component: ConfigShellComponent;
  let fixture: ComponentFixture<ConfigShellComponent>;
  const initialState = { [fromConfig.storeName]: fromConfig.initialState };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigShellComponent ],
      providers: [
        provideMockStore({initialState}),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
