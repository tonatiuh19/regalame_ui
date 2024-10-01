import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { fromLanding } from '../../store/selectors';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { LandingActions } from '../../store/actions';

@Component({
  selector: 'app-user-name-searcher',
  templateUrl: './user-name-searcher.component.html',
  styleUrl: './user-name-searcher.component.css',
})
export class UserNameSearcherComponent implements OnInit {
  @Input() buttonText = 'Crear';
  @Input() isMain = true;
  @Input() uniqueId: string = '';
  @Output() buttonClicked = new EventEmitter<void>();
  @Output() loadingStateChanged = new EventEmitter<boolean>();

  public selectLandingState$ = this.store.select(
    fromLanding.selectLandingState
  );

  public isSubmitButtonDisabled = true;
  public userNameInput = '';
  public isUserNameExist = false;
  public isLoading = false;

  private unsubscribe$ = new Subject<void>();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.selectLandingState$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((landing: any) => {
        if (landing.checkingUser.userName == '0') {
          this.isSubmitButtonDisabled = false;
        } else {
          this.isSubmitButtonDisabled = true;
        }

        this.isLoading = landing.checkingUser.isLoading
          ? landing.checkingUser.isLoading
          : false;

        this.setLoadingState(this.isLoading);

        if (this.isMain) {
          if (
            landing.checkingUser.userName == '0' ||
            !this.userNameInput.length ||
            this.isLoading
          ) {
            this.isUserNameExist = false;
          } else {
            this.isUserNameExist = true;
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onKeyup(event: KeyboardEvent): void {
    this.userNameInput = (event.target as HTMLInputElement).value;
    this.store.dispatch(
      LandingActions.getUserName({
        username: this.userNameInput,
      })
    );
  }

  setLoadingState(isLoading: boolean): void {
    this.isLoading = isLoading;
    this.loadingStateChanged.emit(this.isLoading);
  }

  onButtonClick(): void {
    this.buttonClicked.emit();
  }
}
