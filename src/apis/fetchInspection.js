import axios from 'utils/axiosInstance';
import {BaseURL_ONE, BaseURL_TWO} from '../constants/routes';

export const fetchInspectionHistory = async param => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(
      `${BaseURL_TWO}/developers/inspection-history/${param.id}${param.addedParam}`,
      BEARER_TOKEN
    )
    .then(res => (response = res));
  return response;
};

//post
export const scheduleInspectionForACustomer = async (body, listingId) => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios.post(`${BaseURL_ONE}/investment/scheduletour/${listingId}`, body, BEARER_TOKEN);

  return response;
};

export const cancelInspectionForACustomer = async listingId => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios.delete(`${BaseURL_ONE}/investment/scheduletour/${listingId}`, {}, BEARER_TOKEN);

  return response;
};
