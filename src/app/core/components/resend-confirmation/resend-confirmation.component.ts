import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '@shared/services/auth.service';
import {ToastService} from '@shared/services/toast.service';

@Component({
  selector: 'app-resend-confirmation',
  templateUrl: './resend-confirmation.component.html',
  styleUrls: ['./resend-confirmation.component.css']
})
export class ResendConfirmationComponent implements OnInit {

  sent = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private toast: ToastService,
              private authService: AuthService) {
  }


  ngOnInit(): void {
    const key = this.route.snapshot.paramMap.get('when');
    if (key === 'now') {
      this.resendEmail()
    }
  }

  resendEmail() {
    this.authService.resendConfirmationEmail()
      .toPromise()
      .then(res => {
        this.toast.success('email resent');
        this.sent = true;
      })
  }

}
