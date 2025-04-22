import axios from 'utils/axiosInstance';
import {BaseURL_TWO} from '../constants/routes';

const token =
  typeof window !== 'undefined' &&
  localStorage.getItem('devToken') !== 'undefined' &&
  JSON.parse(localStorage.getItem('devToken'));

const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};

export const fetchSupports = async body => {
  let response = [];

  await axios.get(`${BaseURL_TWO}/supports/`, BEARER_TOKEN).then(res => (response = res));
  return response;
};

export const fetchIndividualChats = async id => {
  let response = [];

  await axios
    .get(`${BaseURL_TWO}/supports/chat/${id}/`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

// send new message
export const sendMessage = (support_id, body) => {
  return axios.post(`${BaseURL_TWO}/supports/chat/${support_id}/`, body, BEARER_TOKEN);
};

// close chat
export const closeChat = support_id => {
  return axios.patch(`${BaseURL_TWO}/supports/${support_id}/close/`, BEARER_TOKEN);
};

// fetch events
export const fetchEvents = async id => {
  let response = [];

  await axios
    .get(`${BaseURL_TWO}/supports/event/${id}/`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};
