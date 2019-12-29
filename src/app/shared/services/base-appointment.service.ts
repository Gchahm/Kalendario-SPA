import {Injectable} from '@angular/core';
import {AppointmentService} from './appointment.service';
import {SelfAppointmentService} from './self-appointment.service';
import {forkJoin, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {IBaseAppointmentRead} from '../../core/models/IBaseAppointmentRead';

@Injectable({
  providedIn: 'root'
})
export class BaseAppointmentService {

  constructor(public aptService: AppointmentService,
              public selfAptService: SelfAppointmentService) {
  }
  get(params): Observable<IBaseAppointmentRead[]> {
    return forkJoin(
        this.aptService.get(params),
        this.selfAptService.get(params),
      ).pipe(
        map(([o1, o2], index) => [].concat(o1).concat(o2))
      );
  }
}
