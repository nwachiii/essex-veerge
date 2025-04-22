import axios from 'utils/axiosInstance';
import {BaseURL_TWO} from '../constants/routes';

export const fetchNotif = async () => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/developers/notify_dev`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

//POSTS

export const UpdateStatus = async body => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axios.patch(`${BaseURL_TWO}/developers/notify_dev`, body, BEARER_TOKEN);
};
