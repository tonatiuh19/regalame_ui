import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  faLock,
  faCircleNotch,
  faPencil,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StripeService } from '../shared/services/stripe.service';
import { Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';
import { Store } from '@ngrx/store';
import { LandingActions } from '../shared/store/actions';
import { fromLanding } from '../shared/store/selectors';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { ICreateOrderRequest } from 'ngx-paypal';

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
  @Input() username: string = '';

  @Output() isCreativePageChange = new EventEmitter<boolean>();

  public selectPaymentSuccess$ = this.store.select(
    fromLanding.selectPaymentSuccess
  );

  public selectLandingState$ = this.store.select(
    fromLanding.selectLandingState
  );

  public selectExtras$ = this.store.select(fromLanding.selectExtras);

  public isCreativePage = false;

  isEditionVisible: boolean = false;

  checkoutForm!: FormGroup;
  editForm!: FormGroup;

  faLock = faLock;
  faCircleNotch = faCircleNotch;
  faPencil = faPencil;
  faXmark = faXmark;

  pictureUrl: string = '';

  isPanelVisible: boolean = false;
  uploadedFiles: any[] = [];
  isImageSelected: boolean = false;

  showAlertEditSuccess: boolean = false;

  public mainExtra: any = {};
  public extraExtras: any = {};
  public reviews: any[] = [];

  public paymentForm: any = {};

  public pricing: number = 0;

  public isStripeError = false;
  public stripeErrorMessage = '';
  public isLoadingCheckout = false;

  public paymentType: 'stripe' | 'paypal' = 'stripe';

  public payPalConfig: any;
  public showPaypalButtons: boolean = false;
  public isErrorPaypal: boolean = false;

  public userId: number = 0;

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

    this.editForm = this.fb.group({
      price: ['', [Validators.required, Validators.min(1)]],
      about: ['', [Validators.required, Validators.minLength(10)]],
      confirmation: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit(): void {
    if (this.username) {
      this.store.dispatch(
        LandingActions.getExtrasByUserName({ username: this.username })
      );

      this.selectExtras$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((extras: any) => {
          if (extras !== 0) {
            console.log(extras);
            this.isCreativePage = true;
            this.mainExtra = extras.extras.find(
              (extra: any) => extra.active === 4
            );
            this.extraExtras = extras.extras.filter(
              (extra: any) => extra.active !== 4
            );
            this.userId = extras.id_user;
          } else {
            this.isCreativePage = false;
          }
          this.isCreativePageChange.emit(this.isCreativePage);
        });
    }

    console.log(this.userId);

    this.pricing = this.mainExtra.price;

    this.selectPaymentSuccess$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((payment: any) => {
        if (payment.paymentSuccess) {
          this.closeModal();
          this.router.navigate(['gracias']);
        }
      });

    this.selectLandingState$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((state: any) => {
        if (state.user.user_name === state.extras.user_name) {
          this.isEditionVisible = true;
        }
        if (state.editSuccess) {
          this.onClosePanel();
          this.showAlertEditSuccess = true;
        }
      });

    this.pictureUrl = this.mainExtra.picture.startsWith('../')
      ? `https://garbrix.com/regalame/${this.mainExtra.picture.replace(
          '../',
          ''
        )}`
      : this.mainExtra.picture;

    this.editForm.setValue({
      price: this.mainExtra.price,
      about: this.getProcessedText(this.mainExtra.about),
      confirmation: this.getProcessedText(this.mainExtra.confirmation),
    });

    if (this.mainExtra.payments.length > 0) {
      this.mainExtra.payments.map((payment: any) => {
        if (payment.isPublic_note_fan === 1) {
          const exists = this.reviews.some(
            (review) => review.id_payments === payment.id_payments
          );
          if (!exists) {
            this.reviews.push(payment);
          }
        }
      });
    }

    this.payPalConfig = {
      currency: 'MXN',
      clientId:
        'AXZCEawZBotPezmoioG0Vw-Hqo8Tjuvh9rcYszUkQseaaTGIxfOViQb_o5XpMHcgYnOVie8dfA3EbrrT',
      createOrder: (data: any) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'MXN',
                value: this.pricing.toString(),
                breakdown: {
                  item_total: {
                    currency_code: 'MXN',
                    value: this.pricing.toString(),
                  },
                },
              },
              items: [
                {
                  name: `Donación Regalameuncafe.com | ${this.extras.id_user}`,
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                    currency_code: 'MXN',
                    value: this.pricing.toString(),
                  },
                },
              ],
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data: any, actions: any) => {
        /*console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });*/
      },
      onClientAuthorization: (data: any) => {
        /*console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );*/
        this.paymentForm = {
          id_user: this.userId,
          id_extra: this.mainExtra.id_extra,
          email_user: this.checkoutForm.value.email,
          amount: this.pricing,
          description: this.mainExtra.title,
          question_answer: '',
          payment_name: this.checkoutForm.value.fullName,
          note_fan: this.checkoutForm.value.message,
          isPublic_note_fan: this.checkoutForm.value.isPublic,
          user_name: this.username,
          payment_type: 'paypal',
          token: data.id,
        };

        console.log(this.paymentForm);

        this.store.dispatch(
          LandingActions.paying({
            paymentData: {
              ...this.paymentForm,
            },
          })
        );
        this.store.dispatch(LandingActions.toogleLoading());
      },
      onCancel: (data: any, actions: any) => {
        console.log('OnCancel', data, actions);
        this.store.dispatch(LandingActions.toogleLoading());
      },
      onError: (err: any) => {
        console.log('OnError', err);
      },
      onClick: (data: any, actions: any) => {
        console.log('onClick', data, actions);
        this.store.dispatch(LandingActions.toogleLoading());
      },
    };
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
    if (this.paymentType === 'stripe') {
      if (!this.stripe || !this.card) {
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

          this.paymentForm = {
            id_user: this.userId,
            id_extra: this.mainExtra.id_extra,
            email_user: this.checkoutForm.value.email,
            amount: this.pricing,
            description: this.mainExtra.title,
            question_answer: '',
            payment_name: this.checkoutForm.value.fullName,
            note_fan: this.checkoutForm.value.message,
            isPublic_note_fan: this.checkoutForm.value.isPublic,
            user_name: this.username,
            payment_type: 'stripe',
          };

          console.log(this.paymentForm);

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
      }
    } else if (this.paymentType === 'paypal') {
      if (this.checkoutForm.valid) {
        this.showPaypalButtons = true;
      } else {
        this.isLoadingCheckout = false;
        this.checkoutForm.markAllAsTouched();
      }
    }
  }

  onEditPage(): void {
    this.isPanelVisible = true;
  }

  onClosePanel(): void {
    this.isPanelVisible = false;
  }

  onUpload(event: any) {
    this.uploadedFiles = [];
    if (event.currentFiles.length > 0) {
      for (let file of event.files) {
        this.uploadedFiles.push(file);
      }
      this.isImageSelected = true;
    }
  }

  onSubmitEdit(): void {
    if (this.editForm.valid) {
      // Handle form submission logic here
      this.store.dispatch(
        LandingActions.updateExtraById({
          extraData: {
            id_extra: this.mainExtra.id_extra,
            about: this.editForm.value.about,
            confirmation: this.editForm.value.confirmation,
            price: this.editForm.value.price,
            picture: this.uploadedFiles[0],
          },
        })
      );
    } else {
      // Mark all fields as touched to trigger validation messages
      this.editForm.markAllAsTouched();
    }
  }

  setStripe() {
    this.paymentType = 'stripe';
  }

  setPaypal() {
    this.paymentType = 'paypal';
  }
}
