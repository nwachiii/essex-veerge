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
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1NTI3OTI0LCJpYXQiOjE3NDUzMTE5MjQsImp0aSI6IjlkMmRjYTU2NTM1YzQzNzk5MDhhMDQxODc3YTg1NTkyIiwidXNlcl9pZCI6NTMwLCJkZXZpY2VfaWQiOm51bGx9.e-lRE9YQSUJxDSG4orl3cweuEwp0ruRVgdgTfjWgbW0';

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
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1NTI3OTI0LCJpYXQiOjE3NDUzMTE5MjQsImp0aSI6IjlkMmRjYTU2NTM1YzQzNzk5MDhhMDQxODc3YTg1NTkyIiwidXNlcl9pZCI6NTMwLCJkZXZpY2VfaWQiOm51bGx9.e-lRE9YQSUJxDSG4orl3cweuEwp0ruRVgdgTfjWgbW0';
  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  const storeName =
    typeof window !== 'undefined' &&
    localStorage &&
    JSON.parse(localStorage.getItem('loggedinUser'))?.developer_link;
  let response = [];

  await axios
    .get(`${BaseURL_TWO}/developers/commission-request/${storeName ?? ''}/${query}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const fetchSingleCommissionRequest = async id => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1NTI3OTI0LCJpYXQiOjE3NDUzMTE5MjQsImp0aSI6IjlkMmRjYTU2NTM1YzQzNzk5MDhhMDQxODc3YTg1NTkyIiwidXNlcl9pZCI6NTMwLCJkZXZpY2VfaWQiOm51bGx9.e-lRE9YQSUJxDSG4orl3cweuEwp0ruRVgdgTfjWgbW0';
  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  const storeName =
    typeof window !== 'undefined' &&
    localStorage &&
    JSON.parse(localStorage.getItem('loggedinUser'))?.developer_link;
  let response = [];
  console.log(storeName);

  await axios
    .get(`${BaseURL_TWO}/developers/commission-request/${storeName}/${id}/`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const fetchAgentDetails = async id => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1NTI3OTI0LCJpYXQiOjE3NDUzMTE5MjQsImp0aSI6IjlkMmRjYTU2NTM1YzQzNzk5MDhhMDQxODc3YTg1NTkyIiwidXNlcl9pZCI6NTMwLCJkZXZpY2VfaWQiOm51bGx9.e-lRE9YQSUJxDSG4orl3cweuEwp0ruRVgdgTfjWgbW0';
  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};

  let response = [];

  await axios
    .get(`${BaseURL_TWO}/developers/view_agent/${id}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const fetchCustomerEquity = async id => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1NTI3OTI0LCJpYXQiOjE3NDUzMTE5MjQsImp0aSI6IjlkMmRjYTU2NTM1YzQzNzk5MDhhMDQxODc3YTg1NTkyIiwidXNlcl9pZCI6NTMwLCJkZXZpY2VfaWQiOm51bGx9.e-lRE9YQSUJxDSG4orl3cweuEwp0ruRVgdgTfjWgbW0';
  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};

  let response = [];

  await axios
    .get(`${BaseURL_TWO}/developers/commission-request-equity/${id}/`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const accountVerificationRequests = async () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1NTI3OTI0LCJpYXQiOjE3NDUzMTE5MjQsImp0aSI6IjlkMmRjYTU2NTM1YzQzNzk5MDhhMDQxODc3YTg1NTkyIiwidXNlcl9pZCI6NTMwLCJkZXZpY2VfaWQiOm51bGx9.e-lRE9YQSUJxDSG4orl3cweuEwp0ruRVgdgTfjWgbW0';
  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};

  let response = [];

  await axios
    .get(`${BaseURL_ONE}/user/verify-verification_id?status=Pending`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const accountVerificationAccepted = async () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1NTI3OTI0LCJpYXQiOjE3NDUzMTE5MjQsImp0aSI6IjlkMmRjYTU2NTM1YzQzNzk5MDhhMDQxODc3YTg1NTkyIiwidXNlcl9pZCI6NTMwLCJkZXZpY2VfaWQiOm51bGx9.e-lRE9YQSUJxDSG4orl3cweuEwp0ruRVgdgTfjWgbW0';
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
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1NTI3OTI0LCJpYXQiOjE3NDUzMTE5MjQsImp0aSI6IjlkMmRjYTU2NTM1YzQzNzk5MDhhMDQxODc3YTg1NTkyIiwidXNlcl9pZCI6NTMwLCJkZXZpY2VfaWQiOm51bGx9.e-lRE9YQSUJxDSG4orl3cweuEwp0ruRVgdgTfjWgbW0';
  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};

  return axios.patch(
    `${BaseURL_TWO}/developers/inspection-response/${parseInt(id)}`,
    body,
    BEARER_TOKEN
  );
};

export const uploadDeedDoc = (id, body) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1NTI3OTI0LCJpYXQiOjE3NDUzMTE5MjQsImp0aSI6IjlkMmRjYTU2NTM1YzQzNzk5MDhhMDQxODc3YTg1NTkyIiwidXNlcl9pZCI6NTMwLCJkZXZpY2VfaWQiOm51bGx9.e-lRE9YQSUJxDSG4orl3cweuEwp0ruRVgdgTfjWgbW0';
  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};

  return axios.post(`${BaseURL_TWO}/developers/save-deed/${parseInt(id)}`, body, BEARER_TOKEN);
};

export const handleRequestCommssion = (requestId, body) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1NTI3OTI0LCJpYXQiOjE3NDUzMTE5MjQsImp0aSI6IjlkMmRjYTU2NTM1YzQzNzk5MDhhMDQxODc3YTg1NTkyIiwidXNlcl9pZCI6NTMwLCJkZXZpY2VfaWQiOm51bGx9.e-lRE9YQSUJxDSG4orl3cweuEwp0ruRVgdgTfjWgbW0';
  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};

  return axios.post(
    `${BaseURL_TWO}/developers/commission-request-respond/${parseInt(requestId)}/`,
    body,
    BEARER_TOKEN
  );
};

export const verifyAccount = (accountId, body) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1NTI3OTI0LCJpYXQiOjE3NDUzMTE5MjQsImp0aSI6IjlkMmRjYTU2NTM1YzQzNzk5MDhhMDQxODc3YTg1NTkyIiwidXNlcl9pZCI6NTMwLCJkZXZpY2VfaWQiOm51bGx9.e-lRE9YQSUJxDSG4orl3cweuEwp0ruRVgdgTfjWgbW0';
  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};

  return axios.patch(`${BaseURL_ONE}/user/id-verify/${parseInt(accountId)}`, body, BEARER_TOKEN);
  // PARAMETER: {
  // "verify": '' //Accepted or Rejected
  // }
};
export const verifyAgent = (accountId, body) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1NTI3OTI0LCJpYXQiOjE3NDUzMTE5MjQsImp0aSI6IjlkMmRjYTU2NTM1YzQzNzk5MDhhMDQxODc3YTg1NTkyIiwidXNlcl9pZCI6NTMwLCJkZXZpY2VfaWQiOm51bGx9.e-lRE9YQSUJxDSG4orl3cweuEwp0ruRVgdgTfjWgbW0';
  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};

  return axios.patch(`${BaseURL_TWO}/developers/agents/${parseInt(accountId)}`, body, BEARER_TOKEN);
};

export const videoVerification = (accountId, body) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1NTI3OTI0LCJpYXQiOjE3NDUzMTE5MjQsImp0aSI6IjlkMmRjYTU2NTM1YzQzNzk5MDhhMDQxODc3YTg1NTkyIiwidXNlcl9pZCI6NTMwLCJkZXZpY2VfaWQiOm51bGx9.e-lRE9YQSUJxDSG4orl3cweuEwp0ruRVgdgTfjWgbW0';
  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};

  return axios.patch(`${BaseURL_ONE}/user/video-verify/${parseInt(accountId)}`, body, BEARER_TOKEN);
  // PARAMETER: {
  // "verify": '' //Accepted or Rejected
  // }
};
