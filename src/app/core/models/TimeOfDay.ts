
export class TimeOfDay {
  public hour: number;
  public minute: number;

  static fromString(time: string): TimeOfDay {
    const timeOfDay = new TimeOfDay();
    timeOfDay.hour = + time.substr(0, 2);
    timeOfDay.minute = + time.substr(3, 2);
    return timeOfDay;
  }

  toString(): string {
    return this.stringfy(this.hour) + ':' + this.stringfy(this.minute);
  }

  private stringfy(value: number): string {
    if (value < 10) {
      return '0' + value.toString();
    }
    return value.toString();
  }
}
