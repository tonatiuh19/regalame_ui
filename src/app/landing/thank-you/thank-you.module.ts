import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThankYouComponent } from './thank-you.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [ThankYouComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [ThankYouComponent],
})
export class ThankYouModule {}
