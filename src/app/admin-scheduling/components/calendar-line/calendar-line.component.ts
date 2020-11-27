import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TimeOfDay} from '@api/models/TimeOfDay';
import {Slot} from '@app/admin-scheduling/models/Slot';

@Component({
  selector: 'app-calendar-line',
  templateUrl: './calendar-line.component.html',
  styleUrls: ['./calendar-line.component.css']
})
export class CalendarLineComponent implements OnInit {

  @Input() time: TimeOfDay;

  @Input() set availability(availability: Slot[]) {
    let available = false;
    for (const slot of availability) {
      if (slot.start.hashCode() <= this.time.hashCode() && slot.end.hashCode() > this.time.hashCode()) {
        available = true;
      }
    }
    this.available = available;
  }
  @Output() clicked = new EventEmitter<TimeOfDay>();

  available = false;
  oClock: boolean;
  private showBtn = false;

  ngOnInit(): void {
      this.oClock = this.time.minute === 0;
    }

  get showButton(): boolean {
    return this.available && this.showBtn;
  }

  toggleVisible(value: boolean) {
    this.showBtn = value;
  }

  emitClick() {
    this.clicked.emit(this.time);
  }

}
