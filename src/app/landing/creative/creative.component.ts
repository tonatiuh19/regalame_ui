import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { faLock, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-creative',
  templateUrl: './creative.component.html',
  styleUrl: './creative.component.css',
})
export class CreativeComponent implements OnInit {
  @ViewChild('checkoutButton') checkoutButton!: ElementRef<HTMLButtonElement>;
  @Input() isLogged: boolean = false;
  @Input() extras: any = {};

  checkoutForm!: FormGroup;
  faLock = faLock;
  faCircleNotch = faCircleNotch;

  public mainExtra: any = {};
  public extraExtras: any = {};

  public pricing: number = 0;

  constructor(private fb: FormBuilder) {
    this.checkoutForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      message: [''],
      isPublic: [true],
      acceptTerms: [true, Validators.requiredTrue],
    });
  }

  ngOnInit(): void {
    this.mainExtra = this.extras.extras.find(
      (extra: any) => extra.active === 4
    );
    this.extraExtras = this.extras.extras.filter(
      (extra: any) => extra.active !== 4
    );
    this.pricing = this.mainExtra.price;
    console.log('mainExtra', this.mainExtra);
  }

  getProcessedText(text: string): string {
    return decodeURIComponent(escape(text));
  }

  priceChange(price: number): void {
    console.log('priceChange', price);
    this.pricing = price;
    this.openModal();
  }

  openModal(): void {
    this.checkoutButton.nativeElement.click();
  }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      console.log('Form Submitted', this.checkoutForm.value);
      // Handle form submission
    } else {
      this.checkoutForm.markAllAsTouched();
      console.log('Form is invalid');
    }
  }
}
