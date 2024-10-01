import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-payment-types-inline',
  templateUrl: './payment-types-inline.component.html',
  styleUrl: './payment-types-inline.component.css',
})
export class PaymentTypesInlineComponent {
  @Input() isPaypal: boolean = false;
}
