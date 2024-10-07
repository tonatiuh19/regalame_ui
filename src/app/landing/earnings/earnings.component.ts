import { Component, OnInit } from '@angular/core';
import { fromLanding } from '../shared/store/selectors';
import { Store } from '@ngrx/store';
import {
  distinctUntilChanged,
  filter,
  Subject,
  switchMap,
  take,
  takeUntil,
} from 'rxjs';
import {
  faXmark,
  faCheck,
  faExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { LandingActions } from '../shared/store/actions';

@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html',
  styleUrl: './earnings.component.css',
})
export class EarningsComponent implements OnInit {
  public isloading$ = this.store.select(fromLanding.selecIsloading);
  public selectLandingState$ = this.store.select(
    fromLanding.selectLandingState
  );
  public selectPayments$ = this.store.select(fromLanding.selectPayments);

  faXmark = faXmark;
  faCheck = faCheck;
  faExclamation = faExclamation;

  public idUser: string = '';
  public isEmpty: boolean = false;

  earnings: any[] = [];

  currentPage: number = 1;
  reviewsPerPage: number = 5;
  paginatedPayments: {
    date: string;
    payment_name: string;
    note_fan: string;
    isPublic_note_fan: number;
    amount: string;
    transfered: number;
  }[] = [];

  private unsubscribe$ = new Subject<void>();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.selectLandingState$
      .pipe(
        takeUntil(this.unsubscribe$),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        ),
        switchMap((state: any) => {
          if (state.payments.length === 0) {
            this.store.dispatch(
              LandingActions.getPaymentsByUserId({ userId: state.user.id_user })
            );
          }
          return this.selectLandingState$.pipe(takeUntil(this.unsubscribe$));
        })
      )
      .subscribe((state: any) => {
        if (state.payments.length === 0) {
          this.isEmpty = true;
        } else {
          this.isEmpty = false;
          this.earnings = state.payments;
          this.updatePaginatedReviews();
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  get totalPages(): number {
    return Math.ceil(this.earnings.length / this.reviewsPerPage);
  }

  updatePaginatedReviews(): void {
    const startIndex = (this.currentPage - 1) * this.reviewsPerPage;
    const endIndex = startIndex + this.reviewsPerPage;
    this.paginatedPayments = this.earnings.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedReviews();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedReviews();
    }
  }

  getProcessedText(text: string): string {
    return decodeURIComponent(escape(text));
  }

  transformDateToSpanish(dateString: string): string {
    const date = new Date(dateString);

    const daysOfWeek = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ];
    const monthsOfYear = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = date.getDate();
    const month = monthsOfYear[date.getMonth()];
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${dayOfWeek}, ${day} de ${month}, ${year}, ${hours}:${minutes}`;
  }
}
