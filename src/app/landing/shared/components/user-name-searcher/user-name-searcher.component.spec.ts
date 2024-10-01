import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNameSearcherComponent } from './user-name-searcher.component';

describe('UserNameSearcherComponent', () => {
  let component: UserNameSearcherComponent;
  let fixture: ComponentFixture<UserNameSearcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserNameSearcherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserNameSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
