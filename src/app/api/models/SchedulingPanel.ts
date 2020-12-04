import {Injectable} from '@angular/core';
import {Adapter} from '@api/adapter';
import {IReadModel} from '@api/models/IReadModel';
import {IEmployee} from './IEmployee';

export class PanelManager {
  /** Returns a new panel instance with the id provided added to the employees list */
  static addEmployee(panel: SchedulingPanel, id: number): SchedulingPanel {
    return {...panel, employees: [...panel.employees, id]};
  }

  /** Returns a new panel instance with the id provided removed from the employees list */
  static removeEmployee(panel: SchedulingPanel, id: number) {
    return {...panel, employees: panel.employees.filter(empId => empId !== id)};
  }

  /** Returns a new panel instance with the name updated with the provided value */
  static updateName(panel: SchedulingPanel, value: string) {
    return {...panel, name: value};
  }
}

export class SchedulingPanel implements IReadModel {
  static modelType = 'schedulingPanel';
  id: number;
  name: string = '';
  employees: number[] = [];

  static fromJs(data: any): SchedulingPanel {
    data = typeof data === 'object' ? data : {};
    const result = new SchedulingPanel();
    if (data) {
      result.id = data.id;
      result.name = data.name;
      result.employees = data.employees;
    }
    return result;
  }
}

export interface ISchedulingPanelWriteModel {
  id: number;
  name: string;
  employees: number[];
}

@Injectable({
  providedIn: 'root'
})
export class SchedulingPanelAdapter implements Adapter<SchedulingPanel> {
  adapt(data: any): SchedulingPanel {
    return SchedulingPanel.fromJs(data);
  }
}
