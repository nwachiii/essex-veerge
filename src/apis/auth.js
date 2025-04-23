import axios from 'utils/axiosInstance';
import {useEffect} from 'react';
import {BaseURL_TWO, BaseURL_ONE} from '../constants/routes';

// GET REQUESTS
// <----->

// POST REQUESTS

export const registerVeergeAccount = body => {
  return axios.post(`${BaseURL_TWO}/developers/sign-up/`, body);
};
export const requestEmailOTP = body => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1NTI3OTI0LCJpYXQiOjE3NDUzMTE5MjQsImp0aSI6IjlkMmRjYTU2NTM1YzQzNzk5MDhhMDQxODc3YTg1NTkyIiwidXNlcl9pZCI6NTMwLCJkZXZpY2VfaWQiOm51bGx9.e-lRE9YQSUJxDSG4orl3cweuEwp0ruRVgdgTfjWgbW0';

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axios.post(`${BaseURL_ONE}/user/create_totp_email_developer`, body);
};
export const verifyResetEmail = body => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1NTI3OTI0LCJpYXQiOjE3NDUzMTE5MjQsImp0aSI6IjlkMmRjYTU2NTM1YzQzNzk5MDhhMDQxODc3YTg1NTkyIiwidXNlcl9pZCI6NTMwLCJkZXZpY2VfaWQiOm51bGx9.e-lRE9YQSUJxDSG4orl3cweuEwp0ruRVgdgTfjWgbW0';

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axios.post(`${BaseURL_TWO}/developers/forgot_password`, body);
};
export const forgotPasswordReset = body => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1NTI3OTI0LCJpYXQiOjE3NDUzMTE5MjQsImp0aSI6IjlkMmRjYTU2NTM1YzQzNzk5MDhhMDQxODc3YTg1NTkyIiwidXNlcl9pZCI6NTMwLCJkZXZpY2VfaWQiOm51bGx9.e-lRE9YQSUJxDSG4orl3cweuEwp0ruRVgdgTfjWgbW0';

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axios.patch(`${BaseURL_TWO}/developers/forgot_password`, body);
};

export const verifyVoiceOTP = body => {
  return axios.post(`${BaseURL_ONE}/user/voice_otp`, body);
};
