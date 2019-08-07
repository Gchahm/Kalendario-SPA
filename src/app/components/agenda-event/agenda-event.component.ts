import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AgendaEvent} from '../../models/AgendaEvent';
import {Moment} from 'moment';

@Component({
  selector: 'app-agenda-event',
  templateUrl: './agenda-event.component.html',
  styleUrls: ['./agenda-event.component.css']
})
export class AgendaEventComponent implements OnInit {

  @Input() agendaEvent: AgendaEvent;

  @Output() onClick = new EventEmitter<AgendaEvent>();

  constructor() { }

  ngOnInit() {
  }

  emitEventClicked() {
    this.onClick.emit(this.agendaEvent);
  }

}
