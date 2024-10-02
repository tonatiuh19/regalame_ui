import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-fans-card-reviews',
  templateUrl: './fans-card-reviews.component.html',
  styleUrls: ['./fans-card-reviews.component.css'],
})
export class FansCardReviewsComponent implements OnInit {
  @Input() reviews: any[] = [];
  /*reviews: { author: string; content: string }[] = [
    { author: 'John Doe', content: 'Great content!' },
    { author: 'Jane Smith', content: 'Loved it!' },
    { author: 'Alice Johnson', content: 'Very informative.' },
    { author: 'Bob Brown', content: 'Keep up the good work!' },
    // Add more reviews as needed
  ];*/

  currentPage: number = 1;
  reviewsPerPage: number = 3;
  paginatedReviews: { payment_name: string; note_fan: string; date: string }[] =
    [];

  ngOnInit(): void {
    this.updatePaginatedReviews();
  }

  get totalPages(): number {
    return Math.ceil(this.reviews.length / this.reviewsPerPage);
  }

  updatePaginatedReviews(): void {
    const startIndex = (this.currentPage - 1) * this.reviewsPerPage;
    const endIndex = startIndex + this.reviewsPerPage;
    this.paginatedReviews = this.reviews.slice(startIndex, endIndex);
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
