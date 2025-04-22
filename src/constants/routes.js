export const BaseURL_ONE = 'https://api.matadortrust.com/v1';
export const BaseURL_TWO = 'https://api.matadortrust.com/v2';

export const ROUTES = {
  home: '/',
  login: '/login',
  newLising: '/listings/create',
  forgotPassword: '/forgot-password',
};

export const STORE_NAME =
  (typeof window !== 'undefined' &&
    localStorage?.getItem('storeDetails') &&
    JSON?.parse(localStorage?.getItem('storeDetails'))?.store_name) ??
  '';

export const LOGGED_IN_USER =
  (typeof window !== 'undefined' &&
    localStorage?.getItem('loggedinUser')?.developer_link &&
    JSON?.parse(localStorage?.getItem('loggedinUser'))) ??
  '';

export const PAGE_URLS = [
  '/',
  '/404',
  '/veerge_plus',
  '/privacy-policy',
  '/terms-conditions',
  '/expected_activities',
  '/auth/forgot_password',
  'veerge_plus/why_veerge',
  '/veerge_plus/veerge_theme',
  '/veerge_plus/letter_from_ceo',
  'veerge_plus/how_we_protect_you',
  '/veerge_plus/agents_guide',
  '/veerge_plus/basic_vs_custom_app',
  '/veerge_menu/application',
  '/auth/onboarding',
  '/account',
  'auth/role-signup',
  '/listings/create/new-unit',
  '/auth/forgot_password/reset_password',
  '/auth/forgot_password/reset_password/success',
  '/auth/onboarding/create_account/account_setup',
  '/auth/onboarding/create_account/createNewPassword',
  '/auth/onboarding/create_account/email_verification',
  '/auth/onboarding/create_account/phone_verification',
  '/auth/onboarding/create_account/upload_document_info',
  '/auth/forgot_password/reset_password/createNewPassword',
  '/listings/manage/unit_info/[id]',
];
