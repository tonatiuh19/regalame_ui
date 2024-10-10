import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faPlusCircle, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { LandingActions } from '../shared/store/actions';
import { fromLanding } from '../shared/store/selectors';
import { distinctUntilChanged, map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-extras',
  templateUrl: './extras.component.html',
  styleUrl: './extras.component.css',
})
export class ExtrasComponent implements OnInit {
  public isloading$ = this.store.select(fromLanding.selecIsloading);
  public selectLandingState$ = this.store.select(
    fromLanding.selectLandingState
  );

  public userId: number = 0;
  public extraId: number = 0;
  public extras: any[] = [];

  isPanelVisible: boolean = false;
  panelTitle: string = 'Agregar nuevo extra';
  panelButton: string = 'Crear';

  extraForm!: FormGroup;

  isLimitOfUsers: boolean = false;

  isEditing: boolean = false;

  faPlusCircle = faPlusCircle;
  faXmark = faXmark;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
    private cdr: ChangeDetectorRef
  ) {
    this.extraForm = this.fb.group({
      title: ['', [Validators.required]],
      price: ['', [Validators.required]],
      subsciption: [false],
      isLimit: [false],
      limit: [''],
      description: ['', [Validators.required]],
      confirmation: ['', [Validators.required]],
      question: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.extraForm.valueChanges.subscribe((values) => {
      if (values.isLimit) {
        this.isLimitOfUsers = true;
        this.extraForm.get('limit')?.setValidators([Validators.required]);
      } else {
        this.isLimitOfUsers = false;
        this.extraForm.get('limit')?.clearValidators();
      }
    });

    this.selectLandingState$
      .pipe(
        takeUntil(this.unsubscribe$),
        map((state: any) => state.user.user_name),
        distinctUntilChanged()
      )
      .subscribe((username: string) => {
        this.store.dispatch(LandingActions.getExtrasByUserName({ username }));
      });

    this.selectLandingState$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((state: any) => {
        this.userId = state.user.id_user;
        this.extras = state.extras.extras.filter(
          (extra: any) => extra.active !== 4
        );
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onEditPage(): void {
    this.isPanelVisible = true;
  }

  onClosePanel(): void {
    this.isPanelVisible = false;
    this.cdr.detectChanges();
    /*this.router.navigate([this.router.url]).then(() => {
      window.location.reload();
    });*/
  }

  getSeverity(limit: number) {
    if (limit > 0) {
      return 'success';
    } else {
      return 'warning';
    }
  }

  onEditExtra(extra: any): void {
    this.panelButton = 'Actualizar';
    this.isEditing = true;
    this.extraId = extra.id_extra;
    this.extraForm.setValue({
      title: extra.title,
      price: extra.price,
      subsciption: extra.subsciption,
      isLimit: extra.limit_slots > 0,
      limit: extra.limit_slots,
      description: extra.description,
      confirmation: extra.confirmation,
      question: extra.question,
    });
    this.panelTitle = 'Editar:' + extra.title;
    this.isPanelVisible = true;
    this.cdr.detectChanges();
  }

  setDeactivateExtra(id_extra: number): void {
    this.extraId = id_extra;
  }

  onDeactivateExtra(): void {
    this.store.dispatch(
      LandingActions.deactivateExtra({
        extraId: {
          id_extra: this.extraId,
        },
      })
    );
  }

  onSubmitExtra(): void {
    if (this.extraForm.valid) {
      // Handle form submission logic here
      if (this.isEditing) {
        this.store.dispatch(
          LandingActions.updateExtra({
            extraData: {
              id_extra: this.extraId,
              title: this.extraForm.get('title')?.value,
              description: this.extraForm.get('description')?.value,
              confirmation: this.extraForm.get('confirmation')?.value,
              limit_slots: this.extraForm.get('limit')?.value,
              price: this.extraForm.get('price')?.value,
              question: this.extraForm.get('question')?.value,
              subsciption: this.extraForm.get('subsciption')?.value,
            },
          })
        );
      } else {
        this.store.dispatch(
          LandingActions.insertNewExtra({
            extraData: {
              id_user: this.userId,
              title: this.extraForm.get('title')?.value,
              description: this.extraForm.get('description')?.value,
              confirmation: this.extraForm.get('confirmation')?.value,
              limit_slots: this.extraForm.get('limit')?.value,
              price: this.extraForm.get('price')?.value,
              question: this.extraForm.get('question')?.value,
              subsciption: this.extraForm.get('subsciption')?.value,
            },
          })
        );
      }
      this.onClosePanel();
      this.extraForm.reset();
      this.isEditing = false;
    } else {
      // Mark all fields as touched to trigger validation messages
      this.extraForm.markAllAsTouched();
    }
  }

  goToTermsAndConditions() {
    window.open(
      this.router.serializeUrl(
        this.router.createUrlTree(['terminosycondiciones'])
      ),
      '_blank'
    );
  }
}
