
export class TimeOfDay {
  public hour: number;
  public minute: number;

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

  toString(): string {
    return this.stringfy(this.hour) + ':' + this.stringfy(this.minute);
  }

  hashCode(): number {
    return this.hour + this.minute / 60;
  }

  private stringfy(value: number): string {
    if (value < 10) {
      return '0' + value.toString();
    }
    return value.toString();
  }
}

interface TimeOfDayInput {
  hour?: number;
  minute?: number;
}
