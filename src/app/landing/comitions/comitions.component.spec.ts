import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComitionsComponent } from './comitions.component';

describe('ComitionsComponent', () => {
  let component: ComitionsComponent;
  let fixture: ComponentFixture<ComitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComitionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
