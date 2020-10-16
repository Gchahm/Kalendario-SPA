import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-mat-list-table',
  templateUrl: './mat-list-table.component.html',
  styleUrls: ['./mat-list-table.component.css']
})
export class MatListTableComponent {
  @Input() title: string;
  @Input() items: { name: string, value: string }[];

  isColor(value: string): boolean {
    if (!value || typeof value.match !== 'function') {
      return false;
    }
    return value.match(/^#[0-9a-f]{3,6}$/i) !== null;
  }
}
