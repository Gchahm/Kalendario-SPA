import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Appointment} from '@api/models/Appointment';

@Component({
  selector: 'app-customer-appointments-table',
  templateUrl: './customer-appointments-table.component.html',
  styleUrls: ['./customer-appointments-table.component.css']
})
export class CustomerAppointmentsTableComponent {

  @Input() set appointments(appointments: Appointment[]) {
    this.appointmentData = appointments.map(appointment => {
      return {
        id: appointment.id,
        start: appointment.start.format('DD/MM/YYYY'),
        employee: appointment.employee.name,
        service: appointment.service.name
      };
    });
  }
  @Output() select = new EventEmitter<number>();

  appointmentData: AppointmentData[];
  displayedColumns: string[] = ['start', 'employee', 'service'];

  onLineClick(row: AppointmentData) {
    this.select.emit(row.id);
  }
}
interface AppointmentData {
  id: number;
  start: string;
  employee: string;
  service: string;
}
