import {Component, OnInit} from '@angular/core';
import {MenuOption} from '../../models/MenuOption';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  sideOpen = true;
  options: MenuOption[] = [
    {name: 'Employee', link: '/admin/employees'},
    {name: 'Services', link: '/admin/services'}
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
