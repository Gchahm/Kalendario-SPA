import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from './admin-schedule/services/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'appointment-manager-SPA';
  subscription: Subscription;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.subscription = this.authService.dispatchUser().subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
