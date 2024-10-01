import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeesCardComponent } from './coffees-card.component';

describe('CoffeesCardComponent', () => {
  let component: CoffeesCardComponent;
  let fixture: ComponentFixture<CoffeesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoffeesCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoffeesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
