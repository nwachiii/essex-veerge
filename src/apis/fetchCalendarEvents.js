import axios from 'utils/axiosInstance';
import {BaseURL_TWO} from '../constants/routes';

export const fetchCalendarEvents = async (date_to_fetch = '01-01-2024') => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1NTI3OTI0LCJpYXQiOjE3NDUzMTE5MjQsImp0aSI6IjlkMmRjYTU2NTM1YzQzNzk5MDhhMDQxODc3YTg1NTkyIiwidXNlcl9pZCI6NTMwLCJkZXZpY2VfaWQiOm51bGx9.e-lRE9YQSUJxDSG4orl3cweuEwp0ruRVgdgTfjWgbW0';

  // date format :dd-mm-yyyy

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/developers/calender/?date=${date_to_fetch}`, BEARER_TOKEN)
    // .get(`${BaseURL_TWO}/developers/calender/?date=${date_to_fetch}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};
