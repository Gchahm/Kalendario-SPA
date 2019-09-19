import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCustomerListComponent } from './dialog-customer-list.component';

describe('DialogCustomerListComponent', () => {
  let component: DialogCustomerListComponent;
  let fixture: ComponentFixture<DialogCustomerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCustomerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
