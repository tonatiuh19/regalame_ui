import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LANDING_FEATURE_KEY } from '../states/landing.state';
import { LandingState } from '../../../landing.model';

export const selectLandingState =
  createFeatureSelector<LandingState>(LANDING_FEATURE_KEY);

export const selectUser = createSelector(
  selectLandingState,
  (state: LandingState) => state.user
);

export const selecIsloading = createSelector(
  selectLandingState,
  (state: LandingState) => state.isLoading
);

export const selectExtras = createSelector(
  selectLandingState,
  (state: LandingState) => state.extras
);

export const selectPayment = createSelector(
  selectLandingState,
  (state: LandingState) => state.payment
);

export const selectPaymentSuccess = createSelector(
  selectLandingState,
  (state: LandingState) => state.paymentSuccess
);
