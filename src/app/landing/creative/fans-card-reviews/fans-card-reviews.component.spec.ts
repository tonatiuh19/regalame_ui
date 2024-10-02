import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FansCardReviewsComponent } from './fans-card-reviews.component';

describe('FansCardReviewsComponent', () => {
  let component: FansCardReviewsComponent;
  let fixture: ComponentFixture<FansCardReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FansCardReviewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FansCardReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
