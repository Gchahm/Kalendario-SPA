import { Injectable } from '@angular/core';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getCurrentUser(): User {
    const user = localStorage.getItem('current_user');
    return JSON.parse(user) as User;
  }

  setCurrentUser(user: User) {
    localStorage.setItem('current_user', JSON.stringify(user));
  }


}
