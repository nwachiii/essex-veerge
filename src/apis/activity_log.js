import axios from 'utils/axiosInstance';
import {BaseURL_TWO} from '../constants/routes';

export const fetchActiviy = async param => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1NTI3OTI0LCJpYXQiOjE3NDUzMTE5MjQsImp0aSI6IjlkMmRjYTU2NTM1YzQzNzk5MDhhMDQxODc3YTg1NTkyIiwidXNlcl9pZCI6NTMwLCJkZXZpY2VfaWQiOm51bGx9.e-lRE9YQSUJxDSG4orl3cweuEwp0ruRVgdgTfjWgbW0';
  // console.log(id, "in api");
  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/developers/activity_log/${param}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};
