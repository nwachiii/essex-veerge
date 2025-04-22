import axios from 'utils/axiosInstance';
import {BaseURL_TWO} from '/src/constants/routes.js';

// GET REQUESTS
export const checkStoreNameAvailability = async storeName => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};

  let response = [];
  if (storeName) {
    await axios
      .get(`${BaseURL_TWO}/store/name/?name_to_check=${storeName}`)
      .then(res => (response = res));
  }
  return response;
};

export const fetchStoreDetailsByDev = async () => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};

  let response = [];

  await axios
    .get(`${BaseURL_TWO}/store/settings/`, BEARER_TOKEN)
    .then(res => (response = res))
    .catch(res => (response = res));

  return response;
};

export const fetchLogo = async () => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};

  let response = [];
  await axios
    .get(`${BaseURL_TWO}/developers/compliance`, BEARER_TOKEN)
    .then(res => (response = res))
    .catch(res => (response = res));
  return response;
};

export const fetchStoreDetailsByUser = async storeName => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};

  let response = [];
  await axios
    .get(`${BaseURL_TWO}/store/settings/?storeName=${storeName}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const fetchAllDomain = async storeName => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};

  let response = [];
  await axios.get(`${BaseURL_TWO}/store/domains/`, BEARER_TOKEN).then(res => (response = res));
  return response;
};

// POST REQUEST
export const createStore = async storeDetailsPayload => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};

  let response = [];
  await axios
    .post(`${BaseURL_TWO}/store/settings/`, storeDetailsPayload, BEARER_TOKEN)
    .then(res => (response = res))
    .catch(err => (response = err));
  return response;
};
export const updateStore = async storeDetailsPayload => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};

  let response = [];
  await axios
    .put(`${BaseURL_TWO}/store/settings/`, storeDetailsPayload, BEARER_TOKEN)
    .then(res => (response = res))
    .catch(err => (response = err));
  return response;
};
