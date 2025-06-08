import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotsForServiceDialogComponent } from './slots-for-service-dialog.component';

describe('SlotsForServiceDialogComponent', () => {
  let component: SlotsForServiceDialogComponent;
  let fixture: ComponentFixture<SlotsForServiceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlotsForServiceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotsForServiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
