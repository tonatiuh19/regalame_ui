import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExtraModalComponent } from './edit-extra-modal.component';

describe('EditExtraModalComponent', () => {
  let component: EditExtraModalComponent;
  let fixture: ComponentFixture<EditExtraModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditExtraModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditExtraModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
