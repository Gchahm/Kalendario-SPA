import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AgendaEvent} from '../../models/AgendaEvent';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  @Input('default-date') currentDate: Date = new Date();
  @Input('events') events: AgendaEvent[];

  @Output() dayRender = new EventEmitter<DateEvent>();

  constructor() { }

  ngOnInit() {
  }

  previousDay() {
    this.currentDate.setDate(this.currentDate.getDate() - 1);
    this.emitDayRender();
  }

  nextDay() {
    this.currentDate.setDate(this.currentDate.getDate() + 1);
    this.emitDayRender();
  }

  emitDayRender() {
    const event = {
      date: this.currentDate
    };
    this.dayRender.emit(event);
  }
}


interface DateEvent {
  date: Date;
}
