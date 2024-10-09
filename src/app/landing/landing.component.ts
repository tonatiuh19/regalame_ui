import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  faArrowRight,
  faSearch,
  faHeart,
  faGift,
  faCommentDots,
} from '@fortawesome/free-solid-svg-icons';
import { ModalSignComponent } from '../shared/components/modal-sign/modal-sign.component';
import { AuthService } from '@auth0/auth0-angular';
import { Store } from '@ngrx/store';
import { LandingActions } from './shared/store/actions';
import { ActivatedRoute, Router } from '@angular/router';
import { fromLanding } from './shared/store/selectors';
import { Subject, takeUntil } from 'rxjs';
import { ExtrasModel } from './landing.model';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent implements OnInit {
  public selectLandingState$ = this.store.select(
    fromLanding.selectLandingState
  );

  public selectExtras$ = this.store.select(fromLanding.selectExtras);

  public isloading$ = this.store.select(fromLanding.selecIsloading);

  public isCreativePage = false;
  public creativeExtra: any = {};

  public quotes: string[] = [
    'diversión.',
    'talento.',
    'creatividad.',
    'arte.',
    'inspiración.',
    'pasión.',
  ];

  public currentQuoteIndex: number = 0;

  public userNameInput = '';

  faArrowRight = faArrowRight;
  faSerach = faSearch;
  faHeart = faHeart;
  faGift = faGift;
  faCommentDots = faCommentDots;

  username!: string;

  public isVisitorCreative = false;

  private ignoreUsernames: string[] = ['gracias', 'anotherUsernameToIgnore'];
  private unsubscribe$ = new Subject<void>();

  constructor(
    public auth: AuthService,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.typeQuote();
    this.auth.user$.subscribe((profile) => {
      if (profile) {
        this.store.dispatch(
          LandingActions.authenticateUser({
            user: {
              ...profile,
              userUserName: this.userNameInput,
            },
          })
        );
      }
    });

    this.selectLandingState$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((landing: any) => {
        this.userNameInput = landing.checkingUser.userNameInput;
      });

    this.route.paramMap.subscribe((params) => {
      this.username = params.get('username') ?? '';
      if (this.username !== 'gracias') {
        this.isVisitorCreative = true;
        this.store.dispatch(
          LandingActions.getExtrasByUserName({ username: this.username })
        );

        this.selectExtras$
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((extras: any) => {
            if (extras !== 0) {
              this.isCreativePage = true;
            } else {
              this.isCreativePage = false;
            }
            this.cdr.detectChanges();
          });
      } else {
        this.router.navigate(['gracias']);
      }
    });

    this.store.dispatch(
      LandingActions.insertVisitor({
        visitorData: {
          section: this.isVisitorCreative ? this.username : 'landing',
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  typeQuote() {
    let quoteElement = document.querySelector('.typing-effect') as HTMLElement;

    if (!quoteElement) {
      // Create and append the element if it doesn't exist
      quoteElement = document.createElement('span');
      quoteElement.classList.add('typing-effect');
      quoteElement.classList.add('d-none');
      document.body.appendChild(quoteElement); // Adjust the parent element as needed
    }
    quoteElement.textContent = '';
    const quote = this.quotes[this.currentQuoteIndex];
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      if (charIndex < quote.length) {
        quoteElement.textContent += quote.charAt(charIndex);
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          this.currentQuoteIndex =
            (this.currentQuoteIndex + 1) % this.quotes.length;
          this.typeQuote();
        }, 2000); // Pause before typing the next quote
      }
    }, 100); // Typing speed
  }

  handleButtonClick(): void {
    const urlSegment = this.router.url.split('/').slice(1).join('/');
    this.auth.loginWithRedirect({
      appState: { target: urlSegment },
    });
  }
}
