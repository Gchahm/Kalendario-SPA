import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotsForServiceHeaderShellComponent } from './slots-for-service-header-shell.component';

describe('SlotsForServiceHeaderShellComponent', () => {
  let component: SlotsForServiceHeaderShellComponent;
  let fixture: ComponentFixture<SlotsForServiceHeaderShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlotsForServiceHeaderShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotsForServiceHeaderShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
