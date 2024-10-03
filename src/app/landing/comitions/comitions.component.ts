import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  faCheck,
  faArrowRight,
  faArrowCircleRight,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-comitions',
  templateUrl: './comitions.component.html',
  styleUrl: './comitions.component.css',
})
export class ComitionsComponent implements OnInit {
  @ViewChild('earningsSection') earningsSection!: ElementRef;

  faCheck = faCheck;
  faArrowRight = faArrowRight;
  faArrowCircleRight = faArrowCircleRight;

  amount = new FormControl();

  transactionAmount: number = 0;
  commissionRate: number = 14.5; // Default commission rate
  earnings: number | null = null;

  amountValue: number = 3500;
  commission: number = 0;
  iva: number = 0;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.amount.setValue(this.amountValue);
    this.earnings = this.calculateEarnings();
    this.amount.valueChanges.subscribe((values) => {
      this.amountValue = values;
      this.earnings = this.calculateEarnings();
    });
  }

  calculateEarnings(): number {
    this.commission = (this.amountValue * this.commissionRate) / 100;
    this.iva = this.commission * 0.16; // Assuming 16% IVA
    return this.amountValue - this.commission - this.iva;
  }

  scrollToEarnings(): void {
    if (this.earningsSection) {
      this.earningsSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
