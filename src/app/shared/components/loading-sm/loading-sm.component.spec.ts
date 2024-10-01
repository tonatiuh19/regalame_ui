import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingSmComponent } from './loading-sm.component';

describe('LoadingSmComponent', () => {
  let component: LoadingSmComponent;
  let fixture: ComponentFixture<LoadingSmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadingSmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingSmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
