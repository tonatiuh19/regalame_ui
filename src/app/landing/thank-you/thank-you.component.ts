import { Component, OnInit } from '@angular/core';
import { faUser, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { fromLanding } from '../shared/store/selectors';
import { Subject, takeUntil } from 'rxjs';
import { LandingActions } from '../shared/store/actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrl: './thank-you.component.css',
})
export class ThankYouComponent implements OnInit {
  public selectPaymentSuccess$ = this.store.select(
    fromLanding.selectPaymentSuccess
  );

  public userName: string = '';

  faUser = faUser;
  faArrowLeft = faArrowLeft;

  private unsubscribe$ = new Subject<void>();

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.selectPaymentSuccess$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((payment: any) => {
        if (payment.paymentSuccess === false) {
          this.router.navigate(['']);
        }
        this.userName = payment.user_name;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.store.dispatch(LandingActions.cleanPayment());
  }

  goToMain(): void {
    this.router.navigate(['', this.userName]);
  }
}
