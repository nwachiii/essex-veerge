import axios from 'utils/axiosInstance';
import {BaseURL_TWO, BaseURL_ONE} from '../constants/routes';

export const sortOrFilter = async param => {
  const token =
    typeof window !== 'undefined' && localStorage && JSON.parse(localStorage.getItem('devToken'));
  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios.post(`${BaseURL_TWO}${param}`, {}, BEARER_TOKEN).then(res => (response = res));
  return response;
};
