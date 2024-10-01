import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { faLock, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StripeService } from '../shared/services/stripe.service';
import { Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';
import { Store } from '@ngrx/store';
import { LandingActions } from '../shared/store/actions';
import { fromLanding } from '../shared/store/selectors';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creative',
  templateUrl: './creative.component.html',
  styleUrl: './creative.component.css',
})
export class CreativeComponent implements OnInit {
  @ViewChild('checkoutButton') checkoutButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('closeButtonModal')
  closeButtonModal!: ElementRef<HTMLButtonElement>;

  @Input() isLogged: boolean = false;
  @Input() extras: any = {};

  public selectPaymentSuccess$ = this.store.select(
    fromLanding.selectPaymentSuccess
  );

  checkoutForm!: FormGroup;
  faLock = faLock;
  faCircleNotch = faCircleNotch;

  public mainExtra: any = {};
  public extraExtras: any = {};

  public paymentForm: any = {};

  public pricing: number = 0;

  public isStripeError = false;
  public stripeErrorMessage = '';
  public isLoadingCheckout = false;

  private stripe: Stripe | null = null;
  private elements: StripeElements | null = null;
  private card: StripeCardElement | null = null;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService,
    private store: Store,
    private router: Router
  ) {
    this.checkoutForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      message: [''],
      isPublic: [true],
      acceptTerms: [true, Validators.requiredTrue],
    });
  }

  ngOnInit(): void {
    this.mainExtra = this.extras.extras.find(
      (extra: any) => extra.active === 4
    );
    this.extraExtras = this.extras.extras.filter(
      (extra: any) => extra.active !== 4
    );
    this.pricing = this.mainExtra.price;

    this.selectPaymentSuccess$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((payment: any) => {
        if (payment.paymentSuccess) {
          this.closeModal();
          this.router.navigate(['gracias']);
        }
      });
  }

  ngAfterViewInit(): void {
    this.setupStripe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getProcessedText(text: string): string {
    return decodeURIComponent(escape(text));
  }

  priceChange(price: number): void {
    console.log('priceChange', price);
    this.pricing = price;
    this.openModal();
  }

  openModal(): void {
    this.checkoutButton.nativeElement.click();
  }

  closeModal(): void {
    this.closeButtonModal.nativeElement.click();
  }

  async setupStripe() {
    const style = {
      base: {
        color: '#32325d',
        fontSmoothing: 'antialiased',
        fontSize: '18px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#dc3545',
        iconColor: '#dc3545',
      },
    };
    this.stripe = await this.stripeService.getStripe();
    if (this.stripe) {
      this.elements = this.stripe.elements({
        locale: 'es', // Set the locale to Spanish
      });
      this.card = this.elements.create('card', { style });
      //this.card = this.elements.create('card');
      this.card.mount('#card-element');
    }
  }

  async handlePayment() {
    if (!this.stripe || !this.card) {
      console.error('Stripe.js has not loaded yet');
      return;
    }

    const { token, error } = await this.stripe.createToken(this.card);

    if (this.checkoutForm.valid) {
      if (error) {
        this.isLoadingCheckout = false;
        this.isStripeError = true;
        this.stripeErrorMessage = error.message || '';
      } else {
        this.isLoadingCheckout = true;
        this.isStripeError = false;
        console.log('Form Submitted', this.checkoutForm.value);

        this.paymentForm = {
          id_user: this.extras.id_user,
          id_extra: this.mainExtra.id_extra,
          email_user: this.checkoutForm.value.email,
          amount: this.pricing,
          description: this.mainExtra.title,
          question_answer: '',
          payment_name: this.checkoutForm.value.fullName,
          note_fan: this.checkoutForm.value.message,
          isPublic_note_fan: this.checkoutForm.value.isPublic,
          user_name: this.extras.user_name,
        };

        console.log('paymentForm', this.paymentForm);
        this.store.dispatch(
          LandingActions.paying({
            paymentData: {
              ...this.paymentForm,
              token: token.id,
            },
          })
        );
      }
    } else {
      this.isLoadingCheckout = false;
      this.checkoutForm.markAllAsTouched();
      console.log('Form is invalid');
    }
  }
}
