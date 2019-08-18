import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Slot} from '../../models/Slot';

@Component({
  selector: 'app-slot',
  templateUrl: './slot-event.component.html',
  styleUrls: ['./slot-event.component.css']
})
export class SlotEventComponent implements OnInit {

  @Input() slot: Slot;
  @Output() onClick = new EventEmitter<Slot>();

  constructor() { }

  ngOnInit() {
  }

  emitEventClicked() {
    this.onClick.emit(this.slot);
  }

}
