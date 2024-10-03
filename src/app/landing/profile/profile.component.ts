import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromLanding } from '../shared/store/selectors';
import { LandingActions } from '../shared/store/actions';
import { Subject, takeUntil } from 'rxjs';
import {
  faFilm,
  faPaintBrush,
  faCode,
  faMicrophone,
  faMasksTheater,
  faFaceKissWinkHeart,
  faGamepad,
  faPalette,
  faPenFancy,
  faCameraRetro,
  faCheese,
  faSeedling,
  faHandshake,
  faMusic,
  faLightbulb,
} from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  public isloading$ = this.store.select(fromLanding.selecIsloading);
  public selectLandingState$ = this.store.select(
    fromLanding.selectLandingState
  );

  faFilm = faFilm;
  faPaintBrush = faPaintBrush;
  faCode = faCode;
  faMicrophone = faMicrophone;
  faMasksTheater = faMasksTheater;
  faFaceKissWinkHeart = faFaceKissWinkHeart;
  faGamepad = faGamepad;
  faPalette = faPalette;
  faPenFancy = faPenFancy;
  faCameraRetro = faCameraRetro;
  faCheese = faCheese;
  faSeedling = faSeedling;
  faHandshake = faHandshake;
  faMusic = faMusic;
  faLightbulb = faLightbulb;

  iconMap: { [key: number]: any } = {
    1: faFilm,
    2: faPaintBrush,
    3: faCode,
    4: faMicrophone,
    5: faMasksTheater,
    6: faFaceKissWinkHeart,
    7: faLightbulb,
    8: faGamepad,
    9: faPalette,
    10: faPenFancy,
    11: faCameraRetro,
    12: faCheese,
    13: faSeedling,
    14: faHandshake,
    15: faMusic,
  };

  public categoriesUser: any[] = [];
  selectedValues: any[] = [];
  public profileForm: FormGroup;
  public userId: number = 0;

  private unsubscribe$ = new Subject<void>();

  constructor(private store: Store, private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      categories: [[], Validators.required],
    });
  }

  ngOnInit(): void {
    this.store.dispatch(LandingActions.getUserCategories());

    this.selectLandingState$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((state) => {
        if (state.user) {
          this.userId = state.user.id_user;
        }

        if (state.categories) {
          this.categoriesUser = state.categories;
        }

        if (state.user) {
          this.profileForm.patchValue({
            nombre: state.user.name,
            apellido: state.user.last_name,
            telefono: state.user.phone,
          });

          /*this.selectedValues = state.user.categories;
          this.profileForm.controls['categories'].setValue(this.selectedValues);*/
        }

        if (state.user?.categories) {
          this.categoriesUser.map((category) => {
            state.user?.categories.map((userCategory: any) => {
              if (category.id_categories === userCategory.id_categories) {
                this.selectedValues.push(category.id_categories);
              }
            });
          });
        }
      });

    this.profileForm.controls['categories'].setValue(this.selectedValues);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSelectionChange(event: Event, id_categories: number) {
    event.stopPropagation();
    event.preventDefault();

    const index = this.selectedValues.indexOf(id_categories);
    if (index > -1) {
      this.selectedValues.splice(index, 1);
    } else {
      this.selectedValues.push(id_categories);
    }

    this.profileForm.controls['categories'].setValue(this.selectedValues);
  }

  getIconById(id: number) {
    return this.iconMap[id] || null;
  }

  updateProfile() {
    if (this.profileForm.valid) {
      this.store.dispatch(
        LandingActions.updateUserByUserId({
          userData: {
            id_user: this.userId,
            name: this.profileForm.get('nombre')?.value,
            last_name: this.profileForm.get('apellido')?.value,
            phone: this.profileForm.get('telefono')?.value,
            categories: this.profileForm.get('categories')?.value,
          },
        })
      );
    } else {
      this.profileForm.markAllAsTouched();
    }
  }
}
