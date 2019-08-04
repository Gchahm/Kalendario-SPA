import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Employee} from '../models/Employee';
import {environment} from '../../environments/environment';
import {concatMap, flatMap, map, mergeMap} from 'rxjs/operators';
import {forkJoin} from 'rxjs';
import {InstagramProfile} from '../models/InstagramProfile';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = environment.apiUrl + 'employees/';

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<Employee[]>(this.baseUrl);
  }

  get(id: string) {
    return this.http.get<Employee>(this.baseUrl + id + '/')
      .pipe(
        mergeMap(emp => {
          return this.http.get<InstagramProfile>('https://www.instagram.com/' + emp.instagram + '/?__a=1')
            .pipe(
            map(insta => {
              emp.photoUrl = insta.graphql.user.profile_pic_url_hd;
              emp.bio = insta.graphql.user.biography;
              return emp as Employee;
            })
          );
        })
      );
  }
}
