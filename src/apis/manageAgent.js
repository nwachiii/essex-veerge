import axios from 'utils/axiosInstance';
import {useEffect} from 'react';
import {BaseURL_TWO, BaseURL_ONE} from '../constants/routes';

export const fetchAgentsInfo = async param => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1NTI3OTI0LCJpYXQiOjE3NDUzMTE5MjQsImp0aSI6IjlkMmRjYTU2NTM1YzQzNzk5MDhhMDQxODc3YTg1NTkyIiwidXNlcl9pZCI6NTMwLCJkZXZpY2VfaWQiOm51bGx9.e-lRE9YQSUJxDSG4orl3cweuEwp0ruRVgdgTfjWgbW0';

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/developers/manage-agents${param}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};
export const verifyAgentEmail = async param => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1NTI3OTI0LCJpYXQiOjE3NDUzMTE5MjQsImp0aSI6IjlkMmRjYTU2NTM1YzQzNzk5MDhhMDQxODc3YTg1NTkyIiwidXNlcl9pZCI6NTMwLCJkZXZpY2VfaWQiOm51bGx9.e-lRE9YQSUJxDSG4orl3cweuEwp0ruRVgdgTfjWgbW0';

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/developers/check-agent/?email=${param}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};
export const fetchListingsWithAgentCommission = async agent_id => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1NTI3OTI0LCJpYXQiOjE3NDUzMTE5MjQsImp0aSI6IjlkMmRjYTU2NTM1YzQzNzk5MDhhMDQxODc3YTg1NTkyIiwidXNlcl9pZCI6NTMwLCJkZXZpY2VfaWQiOm51bGx9.e-lRE9YQSUJxDSG4orl3cweuEwp0ruRVgdgTfjWgbW0';

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/developers/listings/agent/${agent_id}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const fetchAgentInfo = async param => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1NTI3OTI0LCJpYXQiOjE3NDUzMTE5MjQsImp0aSI6IjlkMmRjYTU2NTM1YzQzNzk5MDhhMDQxODc3YTg1NTkyIiwidXNlcl9pZCI6NTMwLCJkZXZpY2VfaWQiOm51bGx9.e-lRE9YQSUJxDSG4orl3cweuEwp0ruRVgdgTfjWgbW0';

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/developers/manage-agents/${param}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const fetchBlackListUsers = async () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1NTI3OTI0LCJpYXQiOjE3NDUzMTE5MjQsImp0aSI6IjlkMmRjYTU2NTM1YzQzNzk5MDhhMDQxODc3YTg1NTkyIiwidXNlcl9pZCI6NTMwLCJkZXZpY2VfaWQiOm51bGx9.e-lRE9YQSUJxDSG4orl3cweuEwp0ruRVgdgTfjWgbW0';

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/developers/blacklist`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

//patch

export const blackListAgent = async id => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1NTI3OTI0LCJpYXQiOjE3NDUzMTE5MjQsImp0aSI6IjlkMmRjYTU2NTM1YzQzNzk5MDhhMDQxODc3YTg1NTkyIiwidXNlcl9pZCI6NTMwLCJkZXZpY2VfaWQiOm51bGx9.e-lRE9YQSUJxDSG4orl3cweuEwp0ruRVgdgTfjWgbW0';

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .patch(`${BaseURL_TWO}/developers/manage-agents/${parseInt(id)}?status=true`, {}, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const whiteListAgent = async id => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1NTI3OTI0LCJpYXQiOjE3NDUzMTE5MjQsImp0aSI6IjlkMmRjYTU2NTM1YzQzNzk5MDhhMDQxODc3YTg1NTkyIiwidXNlcl9pZCI6NTMwLCJkZXZpY2VfaWQiOm51bGx9.e-lRE9YQSUJxDSG4orl3cweuEwp0ruRVgdgTfjWgbW0';

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .patch(`${BaseURL_TWO}/developers/manage-agents/${id}?status=false`, {}, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};
export const assignAgentToEquity = async body => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1NTI3OTI0LCJpYXQiOjE3NDUzMTE5MjQsImp0aSI6IjlkMmRjYTU2NTM1YzQzNzk5MDhhMDQxODc3YTg1NTkyIiwidXNlcl9pZCI6NTMwLCJkZXZpY2VfaWQiOm51bGx9.e-lRE9YQSUJxDSG4orl3cweuEwp0ruRVgdgTfjWgbW0';

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .post(`${BaseURL_TWO}/agents/equity-access`, body, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};
export const modifyAgentCommission = async (body, id) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1NTI3OTI0LCJpYXQiOjE3NDUzMTE5MjQsImp0aSI6IjlkMmRjYTU2NTM1YzQzNzk5MDhhMDQxODc3YTg1NTkyIiwidXNlcl9pZCI6NTMwLCJkZXZpY2VfaWQiOm51bGx9.e-lRE9YQSUJxDSG4orl3cweuEwp0ruRVgdgTfjWgbW0';

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .post(`${BaseURL_TWO}/developers/listings/agent/${id}/modify`, body, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const fetchAgentsDrawer = async agentId => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1NTI3OTI0LCJpYXQiOjE3NDUzMTE5MjQsImp0aSI6IjlkMmRjYTU2NTM1YzQzNzk5MDhhMDQxODc3YTg1NTkyIiwidXNlcl9pZCI6NTMwLCJkZXZpY2VfaWQiOm51bGx9.e-lRE9YQSUJxDSG4orl3cweuEwp0ruRVgdgTfjWgbW0';

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/developers/manage-agents/${Number(agentId)}?drawer=true`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const agentTransactions = async param => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1NTI3OTI0LCJpYXQiOjE3NDUzMTE5MjQsImp0aSI6IjlkMmRjYTU2NTM1YzQzNzk5MDhhMDQxODc3YTg1NTkyIiwidXNlcl9pZCI6NTMwLCJkZXZpY2VfaWQiOm51bGx9.e-lRE9YQSUJxDSG4orl3cweuEwp0ruRVgdgTfjWgbW0';

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/agents/transactions${param}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};
