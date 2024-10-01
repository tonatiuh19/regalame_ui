import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentTypesInlineComponent } from './payment-types-inline.component';

describe('PaymentTypesInlineComponent', () => {
  let component: PaymentTypesInlineComponent;
  let fixture: ComponentFixture<PaymentTypesInlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentTypesInlineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentTypesInlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
