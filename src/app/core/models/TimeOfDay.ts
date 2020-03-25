
function stringfy(value: number): string {
  if (value < 10) {
    return '0' + value.toString();
  }
  return value.toString();
}

export class TimeOfDay {
  public hour = 0;
  public minute = 0;

  constructor(inp?: TimeOfDayInput) {
    if (inp && inp.hour) {
      this.hour = inp.hour;
    }
    if (inp && inp.minute >= 0) {
      this.minute = inp.minute;
    }
  }

  static fromString(time: string): TimeOfDay {
    const timeOfDay = new TimeOfDay();
    timeOfDay.hour = + time.substr(0, 2);
    timeOfDay.minute = + time.substr(3, 2);
    return timeOfDay;
  }

  static zero(): TimeOfDay {
    return new TimeOfDay();
  }

  toString(): string {
    return stringfy(this.hour) + ':' + stringfy(this.minute);
  }

  hashCode(): number {
    return this.hour + this.minute / 60;
  }

}

interface TimeOfDayInput {
  hour?: number;
  minute?: number;
}
