import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentTypesInlineComponent } from './payment-types-inline.component';

@NgModule({
  declarations: [PaymentTypesInlineComponent],
  imports: [CommonModule],
  exports: [PaymentTypesInlineComponent],
})
export class PaymentTypesInlineModule {}
