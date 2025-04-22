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
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axios.post(`${BaseURL_ONE}/user/create_totp_email_developer`, body);
};
export const verifyResetEmail = body => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axios.post(`${BaseURL_TWO}/developers/forgot_password`, body);
};
export const forgotPasswordReset = body => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axios.patch(`${BaseURL_TWO}/developers/forgot_password`, body);
};

export const verifyVoiceOTP = body => {
  return axios.post(`${BaseURL_ONE}/user/voice_otp`, body);
};
