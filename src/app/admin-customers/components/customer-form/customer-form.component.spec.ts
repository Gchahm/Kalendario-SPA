import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CustomerFormComponent} from './customer-form.component';
import {ModelViewSetClientMock} from '@api/testing';
import {CustomerAdminClient} from '@api/clients';
import {Customer} from '@api/models';

describe('CustomerFormComponent', () => {
  let component: CustomerFormComponent;
  let fixture: ComponentFixture<CustomerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerFormComponent],
      providers: [
        {provide: CustomerAdminClient, useClass: ModelViewSetClientMock},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerFormComponent);
    component = fixture.componentInstance;
    component.model = new Customer();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
