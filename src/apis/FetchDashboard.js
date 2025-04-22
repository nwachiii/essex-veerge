import axios from 'utils/axiosInstance';
import {BaseURL_TWO, BaseURL_ONE} from '../constants/routes';

export const fetchDashboardData = async param => {
  const token =
    typeof window !== 'undefined' && localStorage && JSON.parse(localStorage.getItem('devToken'));
  let response = [];
  // console.log(param);
  await axios
    .get(`${BaseURL_TWO}/developers/dashboard${param}`, {
      headers: {Authorization: `Bearer ${token}`},
    })
    .then(res => (response = res));
  return response;
};
export const fetchGraphTransactionBoxesData = async () => {
  const token =
    typeof window !== 'undefined' && localStorage && JSON.parse(localStorage.getItem('devToken'));
  let response = [];
  // console.log(param);
  await axios
    .get(`${BaseURL_TWO}/developers/account_dashboard_response`, {
      headers: {Authorization: `Bearer ${token}`},
    })
    .then(res => (response = res));
  // console.log(param, response);
  return response;
};

export const postExpectedActivities = body => {
  const token =
    typeof window !== 'undefined' && localStorage && JSON.parse(localStorage.getItem('devToken'));
  return axios.post(`${BaseURL_TWO}/developers/expected_activites`, body, {
    headers: {Authorization: `Bearer ${token}`},
  });
};

export const updateTrial = body => {
  const token =
    typeof window !== 'undefined' && localStorage && JSON.parse(localStorage.getItem('devToken'));
  return axios.patch(`${BaseURL_TWO}/developers/updatetrial`, body, {
    headers: {Authorization: `Bearer ${token}`},
  });
};

export const fetchStoreByDeveloper = async () => {
  const token =
    typeof window !== 'undefined' && localStorage && JSON.parse(localStorage.getItem('devToken'));
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/store/settings/`, {headers: {Authorization: `Bearer ${token}`}})
    .then(res => (response = res));
  return response;
};

//POST

export const updateVeergeAssistant = () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1NTI3OTI0LCJpYXQiOjE3NDUzMTE5MjQsImp0aSI6IjlkMmRjYTU2NTM1YzQzNzk5MDhhMDQxODc3YTg1NTkyIiwidXNlcl9pZCI6NTMwLCJkZXZpY2VfaWQiOm51bGx9.e-lRE9YQSUJxDSG4orl3cweuEwp0ruRVgdgTfjWgbW0';

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axios.post(`${BaseURL_ONE}/user/update-quickstart`, {}, BEARER_TOKEN);
};
