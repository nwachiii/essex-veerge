import axios from 'utils/axiosInstance';
import {BaseURL_TWO} from '../constants/routes';

export const fetchActiviy = async param => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1Nzg3NjU2LCJpYXQiOjE3NDU1NzE2NTYsImp0aSI6ImI5ZGZkMGM3MmRmMDRiYzFhNGQwZTViZWUyMGY0OWNhIiwidXNlcl9pZCI6MjA0NSwiZGV2aWNlX2lkIjpudWxsfQ.ljHC6t1YLbUv2cdEMTEDwDon-MCh1krUU0d9yFhns3o';
  // console.log(id, "in api");
  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/developers/activity_log/${param}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};
