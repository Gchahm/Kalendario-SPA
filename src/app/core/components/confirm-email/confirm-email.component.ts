import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../../admin-schedule/services/auth.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {


  constructor(private route: ActivatedRoute,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    const key = this.route.snapshot.paramMap.get('emailKey');
    this.authService.verifyEmail(key)
      .toPromise()
      .then(res => console.log(res))
      .catch(error => console.log(error));
  }

}
