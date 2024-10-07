import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { LandingActions } from '../actions';
import { LandingService } from '../../services/landing.service';
import { fromLanding } from '../selectors';
import { CreativeService } from '../../services/creative.service';

@Injectable()
export class LandingEffects {
  getUserName$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LandingActions.getUserName),
      switchMap(({ username }) => {
        return this.landingService.getUserByUserName(username).pipe(
          map((response) => {
            return LandingActions.getUserNameSuccess({
              userName: response,
            });
          }),
          catchError((error) => {
            return of(
              LandingActions.getUserNameFailure({ errorResponse: error })
            );
          })
        );
      })
    );
  });

  authenticateUser$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(LandingActions.authenticateUser),
        withLatestFrom(
          this.store.select(
            fromLanding.selectLandingState,
            fromLanding.selectUser
          )
        ),
        switchMap(([landingEntity, landingUser]) => {
          /*return of(1);*/
          return this.landingService
            .authenticateUser(
              landingEntity.user.email,
              landingEntity.user.given_name ?? '',
              landingEntity.user.family_name ?? '',
              landingUser.checkingUser?.userNameInput ?? '',
              landingEntity.user.picture,
              landingEntity.user.email_verified
            )
            .pipe(
              map((response) => {
                if (response) {
                  return LandingActions.authenticateUserSuccess({
                    user: response,
                  });
                } else {
                  return LandingActions.authenticateUserFailure({
                    errorResponse: 'Invalid credentials',
                  });
                }
              }),
              catchError((error) => {
                return of(
                  LandingActions.authenticateUserFailure({
                    errorResponse: error,
                  })
                );
              })
            );
        })
      );
    }
    //{ dispatch: false }
  );

  setUserName$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(LandingActions.setUserName),
        withLatestFrom(
          this.store.select(
            fromLanding.selectLandingState,
            fromLanding.selectUser
          )
        ),
        switchMap(([landingEntity, landingUser]) => {
          if (!landingUser.user) {
            return of(
              LandingActions.setUserNameFailure({
                errorResponse: 'User is undefined',
              })
            );
          }
          return this.landingService
            .setUserName(
              landingUser.user.id_user,
              landingUser.checkingUser?.userNameInput ?? ''
            )
            .pipe(
              map((response) => {
                return LandingActions.setUserNameSuccess({
                  userName: response,
                });
              }),
              catchError((error) => {
                return of(
                  LandingActions.setUserNameFailure({ errorResponse: error })
                );
              })
            );
        })
      );
    }
    //{ dispatch: false }
  );

  getExtrasByUserName$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LandingActions.getExtrasByUserName),
      switchMap(({ username }) => {
        return this.creativeService.getExtrasByUserName(username).pipe(
          map((response) => {
            return LandingActions.getExtrasByUserNameSuccess({
              extras: response,
            });
          }),
          catchError((error) => {
            return of(
              LandingActions.getExtrasByUserNameFailure({
                errorResponse: error,
              })
            );
          })
        );
      })
    );
  });

  paying$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LandingActions.paying),
      switchMap(({ paymentData }) => {
        return this.creativeService
          .payingPackage(
            paymentData.id_user,
            paymentData.id_extra,
            paymentData.email_user,
            paymentData.amount,
            paymentData.description,
            paymentData.question_answer,
            paymentData.payment_name,
            paymentData.note_fan,
            paymentData.isPublic_note_fan,
            paymentData.user_name,
            paymentData.payment_type,
            paymentData.token
          )
          .pipe(
            map((response) => {
              return LandingActions.payingSuccess({
                paymentResponse: response,
              });
            }),
            catchError((error) => {
              return of(LandingActions.payingFailure({ errorResponse: error }));
            })
          );
      })
    );
  });

  updateExtraById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LandingActions.updateExtraById),
      switchMap(({ extraData }) => {
        const { id_extra, about, confirmation, price, picture } = extraData;
        return this.creativeService
          .updateExtraById(id_extra, about, confirmation, price, picture)
          .pipe(
            map((response) => {
              return LandingActions.updateExtraByIdSuccess({
                updateResponse: response,
              });
            }),
            catchError((error) => {
              return of(
                LandingActions.updateExtraByIdFailure({ errorResponse: error })
              );
            })
          );
      })
    );
  });

  getPaymentsByUserId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LandingActions.getPaymentsByUserId),
      switchMap(({ userId }) => {
        return this.creativeService.getPaymentsByUserId(userId).pipe(
          map((response) => {
            return LandingActions.getPaymentsByUserIdSuccess({
              payments: response,
            });
          }),
          catchError((error) => {
            return of(
              LandingActions.getPaymentsByUserIdFailure({
                errorResponse: error,
              })
            );
          })
        );
      })
    );
  });

  getUserCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LandingActions.getUserCategories),
      switchMap(() => {
        return this.creativeService.getUserCategories().pipe(
          map((response) => {
            return LandingActions.getUserCategoriesSuccess({
              categories: response,
            });
          }),
          catchError((error) => {
            return of(
              LandingActions.getUserCategoriesFailure({ errorResponse: error })
            );
          })
        );
      })
    );
  });

  updateUserByUserId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LandingActions.updateUserByUserId),
      switchMap(({ userData }) => {
        const { id_user, name, last_name, phone, categories } = userData;
        return this.creativeService
          .updateUserByUserId(id_user, name, last_name, phone, categories)
          .pipe(
            map((response) => {
              return LandingActions.updateUserByUserIdSuccess({
                updateResponse: response,
              });
            }),
            catchError((error) => {
              return of(
                LandingActions.updateUserByUserIdFailure({
                  errorResponse: error,
                })
              );
            })
          );
      })
    );
  });

  updateUserPaymentByUserId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LandingActions.updateUserPaymentByUserId),
      switchMap(({ paymentData }) => {
        const { id_user, id_users_payment_type, value, place } = paymentData;
        return this.creativeService
          .updateUserPaymentByUserId(
            id_user,
            id_users_payment_type,
            value,
            place
          )
          .pipe(
            map((response) => {
              return LandingActions.updateUserPaymentByUserIdSuccess({
                updateResponse: response,
              });
            }),
            catchError((error) => {
              return of(
                LandingActions.updateUserPaymentByUserIdFailure({
                  errorResponse: error,
                })
              );
            })
          );
      })
    );
  });

  insertVisitor$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(LandingActions.insertVisitor),
        switchMap(({ visitorData }) => {
          return this.landingService.insertVisitor(visitorData.section).pipe(
            map((response) => {
              return of(1);
            }),
            catchError((error) => {
              return of(1);
            })
          );
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private landingService: LandingService,
    private creativeService: CreativeService
  ) {}
}
