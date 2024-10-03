import { Action, createReducer, on } from '@ngrx/store';
import {
  initialLandingState,
  LANDING_FEATURE_KEY,
} from '../states/landing.state';
import { LandingActions } from '../actions';
import { createRehydrateReducer } from '../../../../shared/utils/rehydrate-reducer';
import { LandingState } from '../../../landing.model';

export const LandingReducer = createRehydrateReducer(
  { key: LANDING_FEATURE_KEY },
  initialLandingState,

  on(LandingActions.getUserName, (state: LandingState, { username }: any) => {
    return {
      ...state,
      checkingUser: {
        userName: '',
        userNameInput: username,
        isLoading: true,
      },
    };
  }),
  on(LandingActions.getUserNameSuccess, (state: LandingState, { userName }) => {
    return {
      ...state,
      checkingUser: {
        ...state.checkingUser,
        userName: userName,
        isLoading: false,
      },
    };
  }),
  on(
    LandingActions.getUserNameFailure,
    (state: LandingState, { errorResponse }) => {
      return {
        ...state,
        checkingUser: {
          userName: '',
          isLoading: false,
        },
        isError: true,
      };
    }
  ),
  on(LandingActions.authenticateUser, (state: LandingState, { user }: any) => {
    return {
      ...state,
      user: user,
      isLoading: true,
    };
  }),
  on(
    LandingActions.authenticateUserSuccess,
    (state: LandingState, { user }: any) => {
      return {
        ...state,
        user: user,
        isLoading: false,
        isError: false,
      };
    }
  ),
  on(
    LandingActions.authenticateUserFailure,
    (state: LandingState, { errorResponse }: any) => {
      return {
        ...state,
        ...initialLandingState,
        isLoading: false,
        isError: true,
      };
    }
  ),
  on(LandingActions.logoutUser, (state: LandingState) => {
    return {
      ...state,
      ...initialLandingState,
    };
  }),
  on(LandingActions.isSignIn, (state: LandingState) => {
    return {
      ...state,
      isUserinModalSign: true,
    };
  }),
  on(LandingActions.isSignOff, (state: any) => {
    return {
      ...state,
      isUserinModalSign: false,
    };
  }),
  on(LandingActions.setUserName, (state: LandingState) => {
    return {
      ...state,
    };
  }),
  on(LandingActions.setUserNameSuccess, (state: any) => {
    return {
      ...state,
      user: {
        ...state.user,
        user_name: state.checkingUser?.userNameInput,
      },
    };
  }),
  on(
    LandingActions.setUserNameFailure,
    (state: LandingState, { errorResponse }) => {
      return {
        ...state,
        checkingUser: {
          userName: '',
          isLoading: false,
        },
        isError: true,
      };
    }
  ),
  on(LandingActions.getExtrasByUserName, (state: LandingState) => {
    return {
      ...state,
      editSuccess: false,
      isLoading: true,
    };
  }),
  on(
    LandingActions.getExtrasByUserNameSuccess,
    (state: LandingState, { extras }) => {
      return {
        ...state,
        extras: extras,
        isLoading: false,
      };
    }
  ),
  on(
    LandingActions.getExtrasByUserNameFailure,
    (state: LandingState, { errorResponse }) => {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
  ),
  on(LandingActions.paying, (state: LandingState, { paymentData }: any) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(
    LandingActions.payingSuccess,
    (state: LandingState, { paymentResponse }: any) => {
      return {
        ...state,
        paymentSuccess: paymentResponse,
        isLoading: false,
        isError: false,
      };
    }
  ),
  on(
    LandingActions.payingFailure,
    (state: LandingState, { errorResponse }: any) => {
      return {
        ...state,
        ...initialLandingState,
        isLoading: false,
        isError: true,
      };
    }
  ),
  on(LandingActions.cleanPayment, (state: LandingState) => {
    return {
      ...state,
      paymentSuccess: {
        paymentSuccess: false,
      },
      payment: {
        id_payments: 0,
        id_user: 0,
        id_extra: 0,
        date: new Date(),
        question_answer: '',
        note_fan: '',
        isPublic_note_fan: 0,
      },
    };
  }),
  on(LandingActions.updateExtraById, (state: LandingState) => {
    return {
      ...state,
      editSuccess: false,
      isLoading: true,
    };
  }),
  on(LandingActions.updateExtraByIdSuccess, (state: LandingState, {}) => {
    return {
      ...state,
      editSuccess: true,
      isLoading: false,
      isError: false,
    };
  }),
  on(
    LandingActions.updateExtraByIdFailure,
    (state: LandingState, { errorResponse }) => {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
  ),
  on(LandingActions.getPaymentsByUserId, (state: LandingState) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(
    LandingActions.getPaymentsByUserIdSuccess,
    (state: LandingState, { payments }) => {
      return {
        ...state,
        payments: payments,
        isLoading: false,
      };
    }
  ),
  on(
    LandingActions.getPaymentsByUserIdFailure,
    (state: LandingState, { errorResponse }) => {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
  ),
  on(LandingActions.getUserCategories, (state: LandingState) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(
    LandingActions.getUserCategoriesSuccess,
    (state: LandingState, { categories }) => {
      return {
        ...state,
        categories: categories,
        isLoading: false,
      };
    }
  ),
  on(
    LandingActions.getUserCategoriesFailure,
    (state: LandingState, { errorResponse }) => {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
  ),
  on(LandingActions.updateUserByUserId, (state: LandingState) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(
    LandingActions.updateUserByUserIdSuccess,
    (state: LandingState, { updateResponse }) => {
      return {
        ...state,
        user: updateResponse,
        isLoading: false,
        isError: false,
      };
    }
  ),
  on(
    LandingActions.updateUserByUserIdFailure,
    (state: LandingState, { errorResponse }) => {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
  ),
  on(LandingActions.updateUserPaymentByUserId, (state: LandingState) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(
    LandingActions.updateUserPaymentByUserIdSuccess,
    (state: LandingState, { updateResponse }) => {
      return {
        ...state,
        user: updateResponse,
        isLoading: false,
        isError: false,
      };
    }
  ),
  on(
    LandingActions.updateUserPaymentByUserIdFailure,
    (state: LandingState, { errorResponse }) => {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
  )
);
