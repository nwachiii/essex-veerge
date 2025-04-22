import axios from 'utils/axiosInstance';
import {BaseURL_ONE, BaseURL_TWO} from '../constants/routes';

export const fetchMobileAPK = async param => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/developers/veerge-apk/`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const updateMobileApkDownloadStatus = async body => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .patch(`${BaseURL_TWO}/developers/veerge-apk/`, body, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const updateCompanyLogo = async body => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {
    headers: {Authorization: `Bearer ${token}`},
  };
  let response = [];
  await axios
    .post(`${BaseURL_TWO}/developers/update-company-logo`, body, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};
