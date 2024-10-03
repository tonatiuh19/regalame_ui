export interface LandingState {
  checkingUser?: InstantUserInfoModel;
  user?: UserModel;
  extras?: ExtrasModel;
  payment?: PaymentModel;
  payments?: PaymentsModel[];
  categories?: CategoriesModel[];
  paymentSuccess?: PaymentSuccessModel;
  isUserinModalSign?: boolean;
  isLoading?: boolean;
  isError?: boolean;
}

export interface InstantUserInfoModel {
  userName: string;
  userNameInput?: string;
  isLoading?: boolean;
}

export interface UserModel {
  id_user: number;
  email: string;
  email_verified: number;
  picture: string;
  name: string;
  last_name: string;
  stripe_id: string;
  phone: number;
  about: string;
  user_name: string;
  categories?: any;
  paymentsTypes?: any;
}

export interface ExtrasModel {
  id_user: number;
  user_name: string;
  extras: ExtraModel[];
}

export interface ExtraModel {
  id_extra: number;
  title: string;
  picture: string;
  description: string;
  confirmation: string;
  limit_slots: null;
  price: number;
  question: null;
  subsciption: number;
  subsciption_id: string;
  active: number;
  payments: PaymentModel[];
}

export interface PaymentModel {
  id_payments: number;
  id_user: number;
  id_extra: number;
  date: Date;
  question_answer: string;
  note_fan: string;
  isPublic_note_fan: number;
  token?: string;
}

export interface PaymentSuccessModel {
  paymentSuccess: boolean;
}

export interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

export interface PaymentsModel {
  id_payments: number;
  id_user: number;
  id_extra: number;
  date: Date;
  question_answer: string;
  note_fan: string;
  isPublic_note_fan: number;
  payment_name: string;
  amount: string;
  transfered: boolean;
}

export interface CategoriesModel {
  id_categories: number;
  category: string;
  active: number;
}
