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
  isLoading: false,
  isError: false,
  isUserinModalSign: false,
};
