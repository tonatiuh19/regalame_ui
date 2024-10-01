import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreativeComponent } from './creative.component';
import { CoffeesCardModule } from './coffees-card/coffees-card.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentTypesInlineModule } from './payment-types-inline/payment-types-inline.module';

@NgModule({
  declarations: [CreativeComponent],
  imports: [
    CommonModule,
    CoffeesCardModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    PaymentTypesInlineModule,
  ],
  exports: [CreativeComponent],
})
export class CreativeModule {}
