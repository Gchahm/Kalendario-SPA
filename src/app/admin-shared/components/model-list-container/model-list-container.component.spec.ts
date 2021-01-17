import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModelListContainerComponent} from './model-list-container.component';
import {AlerterService} from '@shared/services/alerter.service';
import {AlerterServiceMock} from '@shared/test/stubs';

describe('ModelListContainerComponent', () => {
  let component: ModelListContainerComponent;
  let fixture: ComponentFixture<ModelListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [ModelListContainerComponent],
      providers: [
        {provide: AlerterService, useClass: AlerterServiceMock}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelListContainerComponent);
    component = fixture.componentInstance;
    component.modelList = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
