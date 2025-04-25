import axios from 'utils/axiosInstance';
import {BaseURL_TWO} from '../constants/routes';

export const fetchMessages = async id => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1Nzg3NjU2LCJpYXQiOjE3NDU1NzE2NTYsImp0aSI6ImI5ZGZkMGM3MmRmMDRiYzFhNGQwZTViZWUyMGY0OWNhIiwidXNlcl9pZCI6MjA0NSwiZGV2aWNlX2lkIjpudWxsfQ.ljHC6t1YLbUv2cdEMTEDwDon-MCh1krUU0d9yFhns3o';

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/developers/message_whatsapp/${parseInt(id)}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

// export const fetchSuggestions = async (id)=>{
//     let response = [];
//     await axios.get(`${BaseURL_TWO}/developers/suggestions`,BEARER_TOKEN).then((res) =>(response = res));
//     return response;
// }

//POSTS

export const UpdateMessages = async body => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1Nzg3NjU2LCJpYXQiOjE3NDU1NzE2NTYsImp0aSI6ImI5ZGZkMGM3MmRmMDRiYzFhNGQwZTViZWUyMGY0OWNhIiwidXNlcl9pZCI6MjA0NSwiZGV2aWNlX2lkIjpudWxsfQ.ljHC6t1YLbUv2cdEMTEDwDon-MCh1krUU0d9yFhns3o';

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let id = body.id;
  delete body.id;
  let response = [];
  await axios
    .post(`${BaseURL_TWO}/developers/message_whatsapp/${parseInt(id)}`, body, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};
