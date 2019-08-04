import {Component, Input, OnInit} from '@angular/core';
import {AgendaEvent} from '../../models/AgendaEvent';

@Component({
  selector: 'app-agenda-event',
  templateUrl: './agenda-event.component.html',
  styleUrls: ['./agenda-event.component.css']
})
export class AgendaEventComponent implements OnInit {

  @Input('event') agendaEvent: AgendaEvent;

  constructor() { }

  ngOnInit() {
  }

  timePart(date: Date): string {
    const min = date.getMinutes();
    return date.getHours() + ':' + (min === 0 ? '00' : min);
  }

}
