import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServiceCategoryDialogComponent } from './create-service-category-dialog.component';

describe('CreateServiceCategoryDialogComponent', () => {
  let component: CreateServiceCategoryDialogComponent;
  let fixture: ComponentFixture<CreateServiceCategoryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateServiceCategoryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateServiceCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
