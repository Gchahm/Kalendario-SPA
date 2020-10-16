import {Moment} from 'moment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Company, CompanyAdapter, CompanyDetailsResult, CompanyDetailsResultAdapter, Slot, SlotAdapter} from '@api/models';
import {map} from 'rxjs/operators';
import {ReadOnlyModelViewSetClient} from '@api/clients/ReadOnlyModelViewSetClient';
import {environment} from '../../../environments/environment';
import {convertMoment} from '@api/clients/helpers';
import {adaptList} from '@api/adapter';

export interface SlotsParams {
  employee?: number;
  service: number;
  start: Moment;
  end: Moment;
}


@Injectable({
  providedIn: 'root'
})
export class CompanyClient extends ReadOnlyModelViewSetClient<Company, object> {
  constructor(http: HttpClient,
              adapter: CompanyAdapter,
              private companyDetailAdapter: CompanyDetailsResultAdapter,
              private slotAdapter: SlotAdapter) {
    super(http, adapter, environment.apiUrl + 'companies/');
  }

  fromName(name: string): Observable<CompanyDetailsResult> {
    return this.http.get<CompanyDetailsResult>(this.baseUrl + name + '/').pipe(map(this.companyDetailAdapter.adapt));
  }

  slots(slotsParams: SlotsParams): Observable<Slot[]> {
    const params = convertMoment(slotsParams);
    return this.http.get<Slot[]>(this.baseUrl + 'slots/', {params})
      .pipe(map(adaptList(this.slotAdapter)));
  }
}

