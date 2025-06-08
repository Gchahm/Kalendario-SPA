import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MatListTableComponent} from './mat-list-table.component';

describe('MatListTableComponent', () => {
  let component: MatListTableComponent;
  let fixture: ComponentFixture<MatListTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MatListTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
