import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteSvgCarouselComponent } from './infinite-svg-carousel.component';

describe('InfiniteSvgCarouselComponent', () => {
  let component: InfiniteSvgCarouselComponent;
  let fixture: ComponentFixture<InfiniteSvgCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfiniteSvgCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfiniteSvgCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
