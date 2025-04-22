import axios from 'utils/axiosInstance';
import {BaseURL_TWO} from '../constants/routes';

export const fetchCalendarEvents = async (date_to_fetch = '01-01-2024') => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  // date format :dd-mm-yyyy

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/developers/calender/?date=${date_to_fetch}`, BEARER_TOKEN)
    // .get(`${BaseURL_TWO}/developers/calender/?date=${date_to_fetch}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};
