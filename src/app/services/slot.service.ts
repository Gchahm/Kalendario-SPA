import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Slot, SlotAdapter} from '../models/Slot';
import {map} from 'rxjs/operators';
import {adaptList} from '../core/adapter';

@Injectable({
  providedIn: 'root'
})
export class SlotService {

  private baseUrl = environment.apiUrl + 'slots/';

  constructor(private http: HttpClient,
              private adapter: SlotAdapter) { }

  getAll(employee, service, year, month, day) {
    const params = { employee, service, year, month, day };
    return this.http.get<Slot[]>(this.baseUrl, {params}).pipe(
      map(adaptList(this.adapter))
      );
  }
}
