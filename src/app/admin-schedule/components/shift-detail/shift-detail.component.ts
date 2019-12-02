import { Component, OnInit } from '@angular/core';
import {DetailsComponent} from '../../../core/generics/components/DetailsComponent';
import {Shift} from '../../../core/models/Shift';

@Component({
  selector: 'app-shift-detail',
  templateUrl: './shift-detail.component.html',
  styleUrls: ['./shift-detail.component.css']
})
export class ShiftDetailComponent extends DetailsComponent<Shift> implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
