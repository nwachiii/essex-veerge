import axios from 'utils/axiosInstance';
import {BaseURL_ONE, BaseURL_TWO} from '../constants/routes';

// GET REQUESTS
export const fetchAllCustomers = async () => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/developers/customers/`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const fetchCustomers = async dynamic_queries => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/developers/developer-customer?${dynamic_queries}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const fetchOneCustomer = async customerId => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/developers/developer-customer/${Number(customerId)}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const fetchCustomersEquity = async customerId => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/developers/customers/${Number(customerId)}/equity/`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};
export const fetchCustomerFractionalInfo = async (equityId, customerEmail) => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];

  await axios
    .get(
      `${BaseURL_TWO}/developers/fractional-equity-transfer?current_owner_mail=${customerEmail}&equity=${equityId}`,
      BEARER_TOKEN
    )
    .then(res => (response = res));
  return response;
};
export const transferFractionalOwnership = async body => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};

  return await axios.post(
    `${BaseURL_TWO}/developers/fractional-equity-transfer`,
    body,
    BEARER_TOKEN
  );
};
export const suspendTransaction = async body => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};

  return await axios.post(`${BaseURL_TWO}/developers/equity-suspension`, body, BEARER_TOKEN);
};
export const additionalClosingCost = async body => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};

  return await axios.post(`${BaseURL_TWO}/developers/add-closing-costs`, body, BEARER_TOKEN);
};
export const terminateTransaction = async body => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};

  return await axios.post(
    `${BaseURL_TWO}/developers/equity-termination
    `,
    body,
    BEARER_TOKEN
  );
};
export const terminateFractionalTransaction = async body => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};

  return await axios.post(
    `${BaseURL_TWO}/developers/fractional-equity-termination
    `,
    body,
    BEARER_TOKEN
  );
};
export const uploadSubscribersDoc = async (id, body) => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};

  return await axios.post(
    `${BaseURL_TWO}/developers/upload-packets/${id}
    `,
    body,
    BEARER_TOKEN
  );
};

export const fetchCustomersEquityTxns = async equityId => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/developers/equity/${Number(equityId)}/transactions/`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};
export const fetchCustomersFractionalTxns = async (equityId, userId) => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/developers/fractions/customer/${equityId}/?user=${userId}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};
export const fetchCustomerCoOwnershipTxns = async (equityId, userId) => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/investment/coown-individual/${equityId}/?user=${userId}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const fetchPreviousPaymentsForIndividualOwnership = async (equityId, userId) => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/investment/equity-payments/${equityId}/?user=${userId}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const fetchCustomerVirtualAccountNumber = async equityId => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(
      `${BaseURL_TWO}/account/get-equity-virtual-account/?equity_id=${Number(equityId)}`,
      BEARER_TOKEN
    )
    .then(res => (response = res));
  return response;
};
export const fetchUserWalletTxns = async (userId, param) => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/developers/user_transactions/${Number(userId)}${param}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const fetchCustomerViaEmail = async email => {
  let response = [];
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const business_id =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('business_id'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};

  await axios
    .get(
      `${BaseURL_ONE}/account/user-basic-data?business_id=${business_id}&email=${email}`,
      BEARER_TOKEN
    )
    .then(res => (response = res))
    .catch(res => (response = res));
  return response;
};

export const fetchCustomerEquityPackets = async equityId => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/investment/equity/${equityId}/packets/`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};
export const fetchAllocationsPerUnit = async unitId => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/developers/allocations/?unit_id=${unitId}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};
export const fetchAvailableAllocationsPerUnit = async unitId => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/developers/allocations/?unit_id=${unitId}&available=true`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};
export const fetchSingleEquityInfo = async equityId => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/developers/customers/equity/${equityId}/`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const fetchAllocationForArchiving = async param => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/developers/allocations/${param}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};
export const fetchAllocationsImages = async unitId => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/developers/allocation-images?unit=${unitId}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const sendAnOfferAccountDetailsAndPacket = async equityId => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/investment/equity-info/${equityId}/`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

// POST REQUESTS

export const createCustomer = body => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axios.post(`${BaseURL_TWO}/developers/customers/`, body, BEARER_TOKEN);
};

export const updateCustomerEquityInfo = (equityId, body) => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axios.post(`${BaseURL_TWO}/developers/customers/equity/`, body, BEARER_TOKEN);
};

export const fetchAllocatedEquityInfo = body => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axios.post(`${BaseURL_TWO}/developers/multiple-allocations/`, body, BEARER_TOKEN);
};

export const createCustomerEquity = body => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axios.post(`${BaseURL_TWO}/developers/customers/equity/`, {...body}, BEARER_TOKEN);
};

export const allocateUnitToEquity = body => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axios.post(`${BaseURL_TWO}/developers/allocate/`, {...body}, BEARER_TOKEN);
};

export const deleteAllocationFromEquity = equityId => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axios.delete(`${BaseURL_TWO}/developers/allocations/remove/${equityId}/`, BEARER_TOKEN);
};

export const blacklistCustomer = customerId => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axios.post(
    `${BaseURL_TWO}/developers/customers/${customerId}/blacklist/`,
    {blacklist: true},
    BEARER_TOKEN
  );
};
export const removeUserFromBlacklist = customerId => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axios.post(
    `${BaseURL_TWO}/developers/customers/${customerId}/blacklist/`,
    {blacklist: false},
    BEARER_TOKEN
  );
};

export const addEquityPackets = body => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axios.post(`${BaseURL_TWO}/developers/multiple-equity-packets/`, body, BEARER_TOKEN);
};

export const transferCustomerEquity = body => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axios.post(`${BaseURL_TWO}/developers/equity-transfer`, body, BEARER_TOKEN);
};
export const addCustomerEquityPackets = (equityId, body) => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axios.post(`${BaseURL_TWO}/investment/equity/${equityId}/packets/`, body, BEARER_TOKEN);
};

export const updatePaymentMilestone = body => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axios.patch(`${BaseURL_TWO}/developers/allocations/`, body, BEARER_TOKEN);
};

export const updateAllocationImages = (unitId, body) => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axios.post(
    `${BaseURL_TWO}/developers/update-allocation-images/${unitId}/`,
    body,
    BEARER_TOKEN
  );
};

export const updateAllocationValues = (unitId, body) => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axios.post(
    `${BaseURL_TWO}/developers/edit-allocations-units/${unitId}/`,
    body,
    BEARER_TOKEN
  );
};

export const sendAnOffer = body => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axios.post(`${BaseURL_TWO}/developers/customers/equity/offer/`, body, BEARER_TOKEN);
};

export const updateDeposit = body => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axios.post(`${BaseURL_TWO}/developers/add-manual-payment`, body, BEARER_TOKEN);
};

export const fetchEquityDetails = async (equityId, userId) => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(
      `${BaseURL_TWO}/developers/fetch_equity_details/${Number(equityId)}/?user=${userId}`,
      BEARER_TOKEN
    )
    .then(res => (response = res));
  return response;
};
export const fetchCustomPlanSummary = async planId => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/investment/custom-plan-payments/${planId}/`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const fetchManualDepositTransactions = async equityId => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/developers/add-manual-payment?equity_id=${equityId}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const fetchCommission = async equityId => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/developers/commission-paid/${Number(equityId)}/`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const uploadUsersInformation = async body => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axios.post(`${BaseURL_TWO}/developers/upload-csv/`, body, BEARER_TOKEN);
};

export const updateCustomerName = async (id, body) => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};

  return await axios.post(
    `${BaseURL_ONE}/user/update-customer/${parseInt(id)}`,
    body,
    BEARER_TOKEN
  );
};

export const addMaturityDate = async (id, body) => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};

  let response = [];
  await axios
    .post(`${BaseURL_TWO}/developers/fractions/add-maturity-date/${id}/`, body, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};
