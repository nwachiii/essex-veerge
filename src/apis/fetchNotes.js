import axios from 'utils/axiosInstance';
import {BaseURL_TWO} from '../constants/routes';

export const fetchNotes = async id => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/developers/notes/${id}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const fetchSuggestions = async id => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/developers/suggestions`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

//POSTS

export const UpdateNotes = async body => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let id = body.id;
  delete body.id;
  let response = [];
  await axios
    .post(`${BaseURL_TWO}/developers/notes/${parseInt(id)}`, body, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};
