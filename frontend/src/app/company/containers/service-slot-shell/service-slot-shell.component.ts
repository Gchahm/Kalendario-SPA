import {Component, Input} from '@angular/core';
import * as fromCompany from '@company/state';
import {Store} from '@ngrx/store';
import {ServiceSlot} from '@company/state';

@Component({
  selector: 'company-service-slot-shell',
  templateUrl: './service-slot-shell.component.html',
  styleUrls: ['./service-slot-shell.component.css']
})
export class ServiceSlotShellComponent {

  @Input() slot: ServiceSlot;
  @Input() currentSlotId: number;

  constructor(protected store: Store<fromCompany.State>) {
}

  selectSlot() {
    this.store.dispatch(new fromCompany.SetCurrentSlotId(this.slot.id));
  }

  addToCart() {
    this.store.dispatch(new fromCompany.RequestAddAppointmentRequest());
  }

}
