import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  faCircleRight,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { LandingActions } from '../../../landing/shared/store/actions';
import { Subject, takeUntil } from 'rxjs';
import { fromLanding } from '../../../landing/shared/store/selectors';

@Component({
  selector: 'app-modal-sign',
  templateUrl: './modal-sign.component.html',
  styleUrl: './modal-sign.component.css',
})
export class ModalSignComponent implements OnInit {
  @Input() isSignIn = true;
  @Output() closed = new EventEmitter<void>();

  public selectLandingState$ = this.store.select(
    fromLanding.selectLandingState
  );

  public selectUser$ = this.store.select(fromLanding.selectUser);

  public userNameInput = '';

  public user: any = {};

  isVisible: boolean = false;
  faCircleRight = faCircleRight;
  faCircleXmark = faCircleXmark;

  isSignInLoading: boolean = false;

  private unsubscribe$ = new Subject<void>();

  constructor(private store: Store, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.selectUser$.pipe(takeUntil(this.unsubscribe$)).subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(LandingActions.isSignOff());
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  open(): void {
    this.isVisible = true;
    this.cdr.detectChanges();
    setTimeout(() => {
      document.querySelector('.modal')?.classList.add('show');
    }, 100); // Slight delay to ensure the class is added after the element is displayed
  }

  close(): void {
    this.store.dispatch(LandingActions.isSignOff());
    document.querySelector('.modal')?.classList.remove('show');
    setTimeout(() => {
      this.isVisible = false;
      this.closed.emit();
    }, 300); // Match the duration of the CSS transition
  }

  handleLoadingStateChanged(isLoading: boolean): void {
    this.isSignInLoading = isLoading;
  }

  handleButtonClick(): void {
    if (!this.isSignInLoading) {
      this.store.dispatch(LandingActions.setUserName());
    }
  }
}
