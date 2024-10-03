import { LandingState } from '../../../landing.model';

export const LANDING_FEATURE_KEY = 'landingRegalame';

export const initialLandingState: LandingState = {
  checkingUser: {
    userName: '',
    isLoading: false,
  },
  user: {
    id_user: 0,
    email: '',
    email_verified: 0,
    picture: '',
    name: '',
    last_name: '',
    stripe_id: '',
    phone: 0,
    about: '',
    user_name: '',
  },
  extras: {
    id_user: 0,
    user_name: '',
    extras: [],
  },
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
  payments: [],
  isLoading: false,
  isError: false,
  isUserinModalSign: false,
};
