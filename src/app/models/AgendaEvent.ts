export class AgendaEvent {
  start: Date;
  end: Date;

  constructor(start, end) {
    this.start = new Date(start);
    this.end = new Date(end);
  }
}
