import { createAction, props } from '@ngrx/store';

const actor = '[Landing]';

export const getUserName = createAction(
  `${actor} Get User Name`,
  props<{ username: any }>()
);

export const getUserNameSuccess = createAction(
  `${actor} Get User Name Success`,
  props<{ userName: any }>()
);

export const getUserNameFailure = createAction(
  `${actor} Get User Name Failure`,
  props<{ errorResponse: any }>()
);

export const authenticateUser = createAction(
  `${actor} Authenticate User`,
  props<{ user: any }>()
);

export const authenticateUserSuccess = createAction(
  `${actor} Authenticate User Success`,
  props<{ user: any }>()
);

export const authenticateUserFailure = createAction(
  `${actor} Authenticate User Failure`,
  props<{ errorResponse: any }>()
);

export const logoutUser = createAction(`${actor} Logout User`);

export const isSignIn = createAction(`${actor} Is Sign In Modal`);

export const isSignOff = createAction(`${actor} Is Sign Off Modal`);

export const setUserName = createAction(`${actor} Set User Name`);

export const setUserNameSuccess = createAction(
  `${actor} Set User Name Success`,
  props<{ userName: any }>()
);

export const setUserNameFailure = createAction(
  `${actor} Set User Name Failure`,
  props<{ errorResponse: any }>()
);

export const getExtrasByUserName = createAction(
  `${actor} Get Extras By User Name`,
  props<{ username: any }>()
);

export const getExtrasByUserNameSuccess = createAction(
  `${actor} Get Extras By User Name Success`,
  props<{ extras: any }>()
);

export const getExtrasByUserNameFailure = createAction(
  `${actor} Get Extras By User Name Failure`,
  props<{ errorResponse: any }>()
);

export const paying = createAction(
  `${actor} Paying`,
  props<{ paymentData: any }>()
);

export const payingSuccess = createAction(
  `${actor} Paying Success`,
  props<{ paymentResponse: any }>()
);

export const cleanPayment = createAction(`${actor} Clean Payment`);

export const payingFailure = createAction(
  `${actor} Paying Failure`,
  props<{ errorResponse: any }>()
);

export const updateExtraById = createAction(
  `${actor} Update Extra By Id`,
  props<{ extraData: any }>()
);

export const updateExtraByIdSuccess = createAction(
  `${actor} Update Extra By Id Success`,
  props<{ updateResponse: any }>()
);

export const updateExtraByIdFailure = createAction(
  `${actor} Update Extra By Id Failure`,
  props<{ errorResponse: any }>()
);

export const getPaymentsByUserId = createAction(
  `${actor} Get Payments By User Id`,
  props<{ userId: any }>()
);

export const getPaymentsByUserIdSuccess = createAction(
  `${actor} Get Payments By User Id Success`,
  props<{ payments: any }>()
);

export const getPaymentsByUserIdFailure = createAction(
  `${actor} Get Payments By User Id Failure`,
  props<{ errorResponse: any }>()
);

export const getUserCategories = createAction(`${actor} Get User Categories`);

export const getUserCategoriesSuccess = createAction(
  `${actor} Get User Categories Success`,
  props<{ categories: any }>()
);

export const getUserCategoriesFailure = createAction(
  `${actor} Get User Categories Failure`,
  props<{ errorResponse: any }>()
);

export const updateUserByUserId = createAction(
  `${actor} Update User By User Id`,
  props<{ userData: any }>()
);

export const updateUserByUserIdSuccess = createAction(
  `${actor} Update User By User Id Success`,
  props<{ updateResponse: any }>()
);

export const updateUserByUserIdFailure = createAction(
  `${actor} Update User By User Id Failure`,
  props<{ errorResponse: any }>()
);

export const updateUserPaymentByUserId = createAction(
  `${actor} Update User Payment By User Id`,
  props<{ paymentData: any }>()
);

export const updateUserPaymentByUserIdSuccess = createAction(
  `${actor} Update User Payment By User Id Success`,
  props<{ updateResponse: any }>()
);

export const updateUserPaymentByUserIdFailure = createAction(
  `${actor} Update User Payment By User Id Failure`,
  props<{ errorResponse: any }>()
);

export const toogleLoading = createAction(`${actor} Toogle Loading`);
