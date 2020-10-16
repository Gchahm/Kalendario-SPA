import {Component, OnDestroy, OnInit} from '@angular/core';
import {BaseRWComponent} from '@shared/common/BaseRWComponent';
import {CompanyConfig, IConfigWriteModel, Partial} from '@api/models';
import {Subscription, merge} from 'rxjs';
import {delay, pairwise, startWith} from 'rxjs/operators';

@Component({
  selector: 'admin-company-ui-rw',
  templateUrl: './company-ui-rw.component.html',
  styleUrls: ['./company-ui-rw.component.css']
})
export class CompanyUiRwComponent extends BaseRWComponent<CompanyConfig> implements OnInit, OnDestroy {
  subscription: Subscription;
  shouldSubmit = true;

  writeModel(): Partial<IConfigWriteModel> {
    this.shouldSubmit = true;
    return {
      ownerId: this.model.ownerId,
      private: this.model.private,
      allowCardPayment: this.model.allowCardPayment,
      allowUnpaidRequest: this.model.allowUnpaidRequest,
    };
  }

  ngOnInit() {
    this.subscription = merge(
      this.form.get('private').valueChanges.pipe(startWith(this.model.private), pairwise()),
      this.form.get('allowCardPayment').valueChanges.pipe(startWith(this.model.allowCardPayment), pairwise()),
      this.form.get('allowUnpaidRequest').valueChanges.pipe(startWith(this.model.allowUnpaidRequest), pairwise()),
    ).pipe(
      delay(1000)
    ).subscribe(([prev, next]) => {
      if (prev !== next) {
        this.submitForm();
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
