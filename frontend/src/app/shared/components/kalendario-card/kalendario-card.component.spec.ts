import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KalendarioCardComponent } from './kalendario-card.component';

describe('KalendarioCardComponent', () => {
  let component: KalendarioCardComponent;
  let fixture: ComponentFixture<KalendarioCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KalendarioCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalendarioCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
