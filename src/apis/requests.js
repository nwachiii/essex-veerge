import axios from 'utils/axiosInstance';

import {BaseURL_TWO, BaseURL_ONE, STORE_NAME} from '../constants/routes';

// const token =
//   typeof window !== "undefined" &&
//   localStorage.getItem("devToken") !== "undefined" &&
//   JSON.parse(localStorage.getItem("devToken"));
// const BEARER_TOKEN = {
//   headers: { Authorization: `Bearer ${token}` },
//   onUploadProgress: (progressEvent) => {
//     // progressCallBack && progressCallBack(progressEvent)
//     const percentCompleted = Math.round(
//       (progressEvent.loaded * 100) / progressEvent.total
//     );
//     console.log(percentCompleted);
//   },
// };

// const storeName =
//   typeof window !== "undefined" &&
//   localStorage &&
//   JSON.parse(localStorage.getItem("loggedinUser"))?.developer_link?.split(
//     "."
//   )[0];

// GET REQUESTS EXAMPLE
export const fetchAllRequests = async param => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1Nzg3NjU2LCJpYXQiOjE3NDU1NzE2NTYsImp0aSI6ImI5ZGZkMGM3MmRmMDRiYzFhNGQwZTViZWUyMGY0OWNhIiwidXNlcl9pZCI6MjA0NSwiZGV2aWNlX2lkIjpudWxsfQ.ljHC6t1YLbUv2cdEMTEDwDon-MCh1krUU0d9yFhns3o';

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};

  let response = [];

  await axios
    .get(`${BaseURL_TWO}/developers/request-${param}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

// v2/developers/commission-request/<str:store>/

export const fetchCommissionRequest = async query => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1Nzg3NjU2LCJpYXQiOjE3NDU1NzE2NTYsImp0aSI6ImI5ZGZkMGM3MmRmMDRiYzFhNGQwZTViZWUyMGY0OWNhIiwidXNlcl9pZCI6MjA0NSwiZGV2aWNlX2lkIjpudWxsfQ.ljHC6t1YLbUv2cdEMTEDwDon-MCh1krUU0d9yFhns3o';
  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  const storeName = loggedinUserStatic?.developer_link;
  let response = [];

  await axios
    .get(`${BaseURL_TWO}/developers/commission-request/${storeName ?? ''}/${query}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const fetchSingleCommissionRequest = async id => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1Nzg3NjU2LCJpYXQiOjE3NDU1NzE2NTYsImp0aSI6ImI5ZGZkMGM3MmRmMDRiYzFhNGQwZTViZWUyMGY0OWNhIiwidXNlcl9pZCI6MjA0NSwiZGV2aWNlX2lkIjpudWxsfQ.ljHC6t1YLbUv2cdEMTEDwDon-MCh1krUU0d9yFhns3o';
  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};

  const storeName = loggedinUserStatic?.developer_link;
  let response = [];
  console.log(storeName);

  await axios
    .get(`${BaseURL_TWO}/developers/commission-request/${storeName}/${id}/`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const fetchAgentDetails = async id => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1Nzg3NjU2LCJpYXQiOjE3NDU1NzE2NTYsImp0aSI6ImI5ZGZkMGM3MmRmMDRiYzFhNGQwZTViZWUyMGY0OWNhIiwidXNlcl9pZCI6MjA0NSwiZGV2aWNlX2lkIjpudWxsfQ.ljHC6t1YLbUv2cdEMTEDwDon-MCh1krUU0d9yFhns3o';
  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};

  let response = [];

  await axios
    .get(`${BaseURL_TWO}/developers/view_agent/${id}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const fetchCustomerEquity = async id => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1Nzg3NjU2LCJpYXQiOjE3NDU1NzE2NTYsImp0aSI6ImI5ZGZkMGM3MmRmMDRiYzFhNGQwZTViZWUyMGY0OWNhIiwidXNlcl9pZCI6MjA0NSwiZGV2aWNlX2lkIjpudWxsfQ.ljHC6t1YLbUv2cdEMTEDwDon-MCh1krUU0d9yFhns3o';
  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};

  let response = [];

  await axios
    .get(`${BaseURL_TWO}/developers/commission-request-equity/${id}/`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const accountVerificationRequests = async () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1Nzg3NjU2LCJpYXQiOjE3NDU1NzE2NTYsImp0aSI6ImI5ZGZkMGM3MmRmMDRiYzFhNGQwZTViZWUyMGY0OWNhIiwidXNlcl9pZCI6MjA0NSwiZGV2aWNlX2lkIjpudWxsfQ.ljHC6t1YLbUv2cdEMTEDwDon-MCh1krUU0d9yFhns3o';
  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};

  let response = [];

  await axios
    .get(`${BaseURL_ONE}/user/verify-verification_id?status=Pending`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const accountVerificationAccepted = async () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1Nzg3NjU2LCJpYXQiOjE3NDU1NzE2NTYsImp0aSI6ImI5ZGZkMGM3MmRmMDRiYzFhNGQwZTViZWUyMGY0OWNhIiwidXNlcl9pZCI6MjA0NSwiZGV2aWNlX2lkIjpudWxsfQ.ljHC6t1YLbUv2cdEMTEDwDon-MCh1krUU0d9yFhns3o';
  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};

  let response = [];

  await axios
    .get(`${BaseURL_ONE}/user/verify-verification_id?status=Accepted`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

// POST and PATCH REQUESTS

//reject agent commssion request

export const InspectionRequestResponse = (id, body) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1Nzg3NjU2LCJpYXQiOjE3NDU1NzE2NTYsImp0aSI6ImI5ZGZkMGM3MmRmMDRiYzFhNGQwZTViZWUyMGY0OWNhIiwidXNlcl9pZCI6MjA0NSwiZGV2aWNlX2lkIjpudWxsfQ.ljHC6t1YLbUv2cdEMTEDwDon-MCh1krUU0d9yFhns3o';
  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};

  return axios.patch(
    `${BaseURL_TWO}/developers/inspection-response/${parseInt(id)}`,
    body,
    BEARER_TOKEN
  );
};

export const uploadDeedDoc = (id, body) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1Nzg3NjU2LCJpYXQiOjE3NDU1NzE2NTYsImp0aSI6ImI5ZGZkMGM3MmRmMDRiYzFhNGQwZTViZWUyMGY0OWNhIiwidXNlcl9pZCI6MjA0NSwiZGV2aWNlX2lkIjpudWxsfQ.ljHC6t1YLbUv2cdEMTEDwDon-MCh1krUU0d9yFhns3o';
  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};

  return axios.post(`${BaseURL_TWO}/developers/save-deed/${parseInt(id)}`, body, BEARER_TOKEN);
};

export const handleRequestCommssion = (requestId, body) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1Nzg3NjU2LCJpYXQiOjE3NDU1NzE2NTYsImp0aSI6ImI5ZGZkMGM3MmRmMDRiYzFhNGQwZTViZWUyMGY0OWNhIiwidXNlcl9pZCI6MjA0NSwiZGV2aWNlX2lkIjpudWxsfQ.ljHC6t1YLbUv2cdEMTEDwDon-MCh1krUU0d9yFhns3o';
  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};

  return axios.post(
    `${BaseURL_TWO}/developers/commission-request-respond/${parseInt(requestId)}/`,
    body,
    BEARER_TOKEN
  );
};

export const verifyAccount = (accountId, body) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1Nzg3NjU2LCJpYXQiOjE3NDU1NzE2NTYsImp0aSI6ImI5ZGZkMGM3MmRmMDRiYzFhNGQwZTViZWUyMGY0OWNhIiwidXNlcl9pZCI6MjA0NSwiZGV2aWNlX2lkIjpudWxsfQ.ljHC6t1YLbUv2cdEMTEDwDon-MCh1krUU0d9yFhns3o';
  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};

  return axios.patch(`${BaseURL_ONE}/user/id-verify/${parseInt(accountId)}`, body, BEARER_TOKEN);
  // PARAMETER: {
  // "verify": '' //Accepted or Rejected
  // }
};
export const verifyAgent = (accountId, body) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1Nzg3NjU2LCJpYXQiOjE3NDU1NzE2NTYsImp0aSI6ImI5ZGZkMGM3MmRmMDRiYzFhNGQwZTViZWUyMGY0OWNhIiwidXNlcl9pZCI6MjA0NSwiZGV2aWNlX2lkIjpudWxsfQ.ljHC6t1YLbUv2cdEMTEDwDon-MCh1krUU0d9yFhns3o';
  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};

  return axios.patch(`${BaseURL_TWO}/developers/agents/${parseInt(accountId)}`, body, BEARER_TOKEN);
};

export const videoVerification = (accountId, body) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1Nzg3NjU2LCJpYXQiOjE3NDU1NzE2NTYsImp0aSI6ImI5ZGZkMGM3MmRmMDRiYzFhNGQwZTViZWUyMGY0OWNhIiwidXNlcl9pZCI6MjA0NSwiZGV2aWNlX2lkIjpudWxsfQ.ljHC6t1YLbUv2cdEMTEDwDon-MCh1krUU0d9yFhns3o';
  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};

  return axios.patch(`${BaseURL_ONE}/user/video-verify/${parseInt(accountId)}`, body, BEARER_TOKEN);
  // PARAMETER: {
  // "verify": '' //Accepted or Rejected
  // }
};

export const loggedinUserStatic = {
  id: 530,
  avatar: 'https://matador-bucket.s3.amazonaws.com/media/6768823a-5f2.png',
  id_document: null,
  proof_of_address: null,
  next_of_kin: null,
  bank_accounts: [],
  role: 'Account Owner',
  team_status: 'accepted',
  team_company_name: 'VEERGE',
  in_review: false,
  expected_activities: true,
  trial_days: 0,
  trial_display: true,
  is_owner: true,
  developer_link: null,
  last_login: '2025-04-22T09:52:04.855392+01:00',
  username: null,
  bvn: null,
  year_of_birth: null,
  parents_ids: null,
  date_of_birth: null,
  email: 'useveerge@gmail.com',
  first_name: 'VEERGE',
  lang: null,
  last_name: 'EMPIRE',
  middle_name: null,
  phone: '2348166111356',
  status: true,
  is_blocked: false,
  gender: null,
  default_timezone: null,
  address: null,
  yearly_income: null,
  employment_status: null,
  monthly_income: null,
  occupation: null,
  marital_status: null,
  company_name: 'VEERGE',
  company_address: 'LEKKI, LAGOS',
  cac_number: '1290983498',
  highest_education: null,
  referral_code: '2Q879Q',
  push_notification_id: 'NOTIFY-5309948789353',
  enable_2fa: false,
  recovery_code: 'jZqvdZ',
  is_qualified_for_line_of_credit: false,
  is_qualified_for_mortgage: false,
  last_contact_update: null,
  push_notification_allowed: false,
  biometric_authentication: false,
  is_private: false,
  about_dev: null,
  initial_status: 'Accepted',
  passward_change_time: '2023-07-20T10:26:58.831333+01:00',
  referred_by: null,
  sign_up_time: '2023-07-20T10:15:47.387967+01:00',
  dynamic_referral: null,
  is_tier3: false,
  use_security_question: false,
  security_question: null,
  security_answer: null,
  developer_feedback: null,
  referral_status: 'Pending',
  outreach: null,
  agent_id: null,
  invite_code: null,
  co_parent_invite: null,
  mfa_secret: 'LRIOJFXCTIHQJQ62',
  is_mfa: false,
  last_activity: '2025-04-22T10:52:04.861526+01:00',
  approved_at: null,
  country: 1,
  annual_income: null,
  channel: null,
  groups: [37],
};
