import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ToolbarEmployee} from '@app/admin-scheduling/state';
import * as moment from 'moment';
import {Moment} from 'moment';
import {PanelManager, SchedulingPanel} from '@api/models';
import {MatDialog} from '@angular/material/dialog';
import {TextInputDialogComponent} from '@shared/components/text-input-dialog/text-input-dialog.component';
import {AlerterService} from '@shared/services/alerter.service';
import {pulseAnimation} from 'angular-animations';

@Component({
  selector: 'admin-scheduling-page-toolbar',
  templateUrl: './scheduling-page-toolbar.component.html',
  styleUrls: ['./scheduling-page-toolbar.component.scss'],
  animations: [pulseAnimation({scale: 1.2, duration: 300, delay: 0})]
})
export class SchedulingPageToolbarComponent {

  @Input() toolbarEmployees: ToolbarEmployee[];
  @Input() currentPanel: SchedulingPanel;
  @Input() requestCount: number;
  @Input() date: Moment;
  @Input() isMobile: boolean;

  private _panels: SchedulingPanel[];
  @Input() set panels(value: SchedulingPanel[]) {
    this._panels = value;
    this.panelPulses = value.map(p => false);
  }
  get panels(): SchedulingPanel[] {
    return this._panels;
  }

  /* Emits when an employee that is not showing gets a click */
  @Output() select = new EventEmitter<SchedulingPanel>();
  @Output() update = new EventEmitter<SchedulingPanel>();
  @Output() create = new EventEmitter<SchedulingPanel>();
  @Output() delete = new EventEmitter<SchedulingPanel>();
  @Output() toggleRequests = new EventEmitter<void>();
  @Output() dateChanged = new EventEmitter<Moment>();

  panelPulses: boolean[];

  constructor(private dialog: MatDialog,
              public alerter: AlerterService) {
  }

  color(panel: SchedulingPanel): boolean {
    return this.currentPanel?.id === panel.id;
  }

  selectClick(index: number) {
    this.select.emit(this.panels[index]);
    this.panelPulses[index] = !this.panelPulses[index];
  }

  addEmployee(tbEmp: ToolbarEmployee) {
    if (!tbEmp.isSelected) {
      this.update.emit(PanelManager.addEmployee(this.currentPanel, tbEmp.employee.id));
    }
  }

  today() {
    this.dateChanged.emit(moment.utc());
  }

  previousDay() {
    this.dateChanged.emit(this.date.subtract(1, 'd'));
  }

  nextDay() {
    this.dateChanged.emit(this.date.add(1, 'd'));
  }

  createPanel() {
    const dialogRef = this.dialog.open(TextInputDialogComponent, {
      width: '400px',
      data: {message: 'type the name of the panel', label: 'name'}
    });
    dialogRef.afterClosed().subscribe(name => {
      if (!!name) {
        this.create.emit(SchedulingPanel.fromJs({name}));
      }
    });
  }

  editPanel() {
    const dialogRef = this.dialog.open(TextInputDialogComponent, {
      width: '400px',
      data: {message: 'type the new name of the panel', result: this.currentPanel.name, label: 'name'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.update.emit(PanelManager.updateName(this.currentPanel, result));
      }
    });
  }

  deletePanel() {
    this.alerter.warn('Are you sure?',
      `this will permanently delete ${this.currentPanel.name} panel`)
      .toPromise()
      .then(res => {
        if (res) {
          this.delete.emit(this.currentPanel);
        }
      });
  }
}
