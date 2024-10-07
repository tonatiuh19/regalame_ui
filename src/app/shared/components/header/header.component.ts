import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { fromLanding } from '../../../landing/shared/store/selectors';
import { LandingActions } from '../../../landing/shared/store/actions';
import { AuthService } from '@auth0/auth0-angular';
import { ModalSignComponent } from '../modal-sign/modal-sign.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('userNameModal') userNameModal!: ElementRef<HTMLButtonElement>;
  @ViewChild('userNameModalClose')
  userNameModalClose!: ElementRef<HTMLButtonElement>;
  @Input() isMain = true;

  public selectLandingState$ = this.store.select(
    fromLanding.selectLandingState
  );

  username: string = '';

  public isLogged = false;

  public user: any = {};
  public isPayments = true;
  public isNotUserName = false;

  faUserCircle = faUserCircle;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private store: Store,
    public auth: AuthService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.selectLandingState$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((state) => {
        this.user = state.user;
        this.isLogged = !!(state.user && this.user.id_user !== 0);

        console.log(this.user);
        if (this.user.user_name === '') {
          this.isNotUserName = true;
        } else {
          this.username = this.user.user_name;
        }
        /* if ((state.payments ?? []).length > 0) {
          this.isPayments = true;
        }*/
      });

    this.auth.user$.subscribe((profile) => {
      if (profile) {
        this.store.dispatch(
          LandingActions.authenticateUser({
            user: {
              ...profile,
            },
          })
        );
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.isNotUserName && this.isLogged) {
      this.openModal();
    } else {
      this.closeModal();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  login(): void {
    const urlSegment = this.router.url.split('/').slice(1).join('/');
    this.auth.loginWithRedirect({
      appState: { target: urlSegment },
    });
  }

  logOut(): void {
    this.isLogged = false;
    this.store.dispatch(LandingActions.logoutUser());
    this.auth.logout();
  }

  goToComitions(): void {
    this.router.navigate(['comisiones']);
  }

  goToEarnings(): void {
    this.router.navigate(['mispagos']);
  }

  goToProfile(): void {
    this.router.navigate(['miperfil']);
  }

  openModal(): void {
    this.userNameModal.nativeElement.click();
  }

  closeModal(): void {
    this.userNameModalClose.nativeElement.click();
  }

  handleButtonClick(): void {
    this.store.dispatch(LandingActions.setUserName());
    this.closeModal();
    this.router.navigate(['miperfil']);
  }

  goToMypage(): void {
    console.log('go to my page', this.username);
    this.router.navigate([this.username]);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbar = document.getElementById('navbar');

    const targetElement = document.getElementById('target-element');

    if (this.isMain) {
      if (navbar && targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top;
        const navbarHeight = navbar.offsetHeight;

        if (targetPosition <= navbarHeight) {
          navbar.classList.add('bg-light');
        } else {
          navbar.classList.remove('bg-light');
        }
      }
    } else {
      navbar ? navbar.classList.add('bg-light') : null;
    }
  }
}
