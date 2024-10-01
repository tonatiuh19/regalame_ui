import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-coffees-card',
  templateUrl: './coffees-card.component.html',
  styleUrl: './coffees-card.component.css',
})
export class CoffeesCardComponent implements OnInit {
  @Input() basePrice = 0;
  @Output() priceChange = new EventEmitter<number>();

  buttons = [1, 3, 5];
  selectedButton: number | null = 0;
  inputValue: number | null = this.buttons[0];

  price: number = 0;

  faDollarSign = faDollarSign;

  constructor() {}

  ngOnInit(): void {
    this.price = this.basePrice;
  }

  selectButton(index: number): void {
    this.selectedButton = index;
    this.inputValue = this.buttons[index];

    this.price = this.basePrice * this.inputValue;
  }

  onInputChange(value: number): void {
    const index = this.buttons.indexOf(value);

    if (index !== -1) {
      this.selectedButton = index;
    } else {
      this.selectedButton = null;
    }

    this.price = this.basePrice * value;
  }

  supportButton(): void {
    this.priceChange.emit(this.price);
  }
}
