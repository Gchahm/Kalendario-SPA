import {Component, OnInit} from '@angular/core';
import {Globals} from '../../../core/services/Globals';
import {User} from '../../../core/models/User';

@Component({
  selector: 'admin-dashboard-side-bar',
  templateUrl: './dashboard-side-bar.component.html',
  styleUrls: ['./dashboard-side-bar.component.css']
})
export class DashboardSideBarComponent implements OnInit {

  user: User;

  constructor(public globals: Globals) { }

  ngOnInit(): void {
    this.user = this.globals.user;
  }
}
