import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AgendaEvent} from '../models/AgendaEvent';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SlotService {

  private baseUrl = environment.apiUrl + 'slots/';

  constructor(private http: HttpClient) { }

  getAll(employee, service, year, month, day) {
    const params = { employee, service, year, month, day };
    return this.http.get<AgendaEvent[]>(this.baseUrl, {params})
      .pipe(map(agendaEvents => agendaEvents.map(ae => new AgendaEvent(ae.start, ae.end))
      ));
  }

  create(employee, service, customer, year, month, day) {

  }
}
