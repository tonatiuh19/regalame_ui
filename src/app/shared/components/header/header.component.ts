import {
  Component,
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
export class HeaderComponent implements OnInit {
  @ViewChild('modal') modal!: ModalSignComponent;
  @Input() isMain = true;

  public selectUser$ = this.store.select(fromLanding.selectUser);

  public isLogged = false;

  public user: any = {};
  public isNotUserName = false;

  faUserCircle = faUserCircle;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private store: Store,
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.selectUser$.pipe(takeUntil(this.unsubscribe$)).subscribe((user) => {
      this.user = user;
      this.isLogged = !!(user && this.user.id_user !== 0);
      if (this.user.user_name === '') {
        this.isNotUserName = true;
      }
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
    // The modal reference is now available
    if (this.isNotUserName && this.isLogged) {
      this.modal.open();
    } else {
      this.modal.close();
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
