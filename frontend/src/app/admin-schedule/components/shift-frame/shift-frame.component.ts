import {Component, Input} from '@angular/core';
import {TimeFrame} from '@api/models';

@Component({
  selector: 'app-shift-frame',
  templateUrl: './shift-frame.component.html',
  styleUrls: ['./shift-frame.component.css']
})
export class ShiftFrameComponent {
  private _frame: TimeFrame;
  @Input() set frame(value: TimeFrame) {
    this._frame = value;
    this.styleLeft = this.calculateStartPosition(value);
    this.styleWidth = this.calculateWidth(value);
  }
  get frame(): TimeFrame {
    return this._frame;
  }

  styleLeft: string;
  styleWidth: string;

  modifier = 2.5;

  calculateStartPosition(value: TimeFrame): string {
    const start = (value.start.hour + value.start.minute / 60) * this.modifier;
    return `${start}rem`;
  }

  calculateWidth(value: TimeFrame): string {
    const start = (value.start.hour + value.start.minute / 60);
    const end = (value.end.hour + value.end.minute / 60);
    const result = (end - start) * this.modifier;
    return `${result}rem`;
  }
}
