import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaEventComponent } from './agenda-event.component';

describe('AgendaEventComponent', () => {
  let component: AgendaEventComponent;
  let fixture: ComponentFixture<AgendaEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendaEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
