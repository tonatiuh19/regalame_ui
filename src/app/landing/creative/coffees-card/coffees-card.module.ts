import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoffeesCardComponent } from './coffees-card.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [CoffeesCardComponent],
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  exports: [CoffeesCardComponent],
})
export class CoffeesCardModule {}
