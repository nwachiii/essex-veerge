import axios from 'utils/axiosInstance';
import {BaseURL_TWO, BaseURL_ONE} from '../constants/routes';
import {BODY} from 'frontmatter-markdown-loader/mode';

// GET REQUESTS
export const fetchAllAccountData = async params => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1Nzg3NjU2LCJpYXQiOjE3NDU1NzE2NTYsImp0aSI6ImI5ZGZkMGM3MmRmMDRiYzFhNGQwZTViZWUyMGY0OWNhIiwidXNlcl9pZCI6MjA0NSwiZGV2aWNlX2lkIjpudWxsfQ.ljHC6t1YLbUv2cdEMTEDwDon-MCh1krUU0d9yFhns3o';

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/developers/account_details/${params}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};
export const fetchAllWithdrawalTxns = async params => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1Nzg3NjU2LCJpYXQiOjE3NDU1NzE2NTYsImp0aSI6ImI5ZGZkMGM3MmRmMDRiYzFhNGQwZTViZWUyMGY0OWNhIiwidXNlcl9pZCI6MjA0NSwiZGV2aWNlX2lkIjpudWxsfQ.ljHC6t1YLbUv2cdEMTEDwDon-MCh1krUU0d9yFhns3o';

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/developers/account/transactions/?type=withdrawal${params}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const fetchAllDepositTxns = async params => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1Nzg3NjU2LCJpYXQiOjE3NDU1NzE2NTYsImp0aSI6ImI5ZGZkMGM3MmRmMDRiYzFhNGQwZTViZWUyMGY0OWNhIiwidXNlcl9pZCI6MjA0NSwiZGV2aWNlX2lkIjpudWxsfQ.ljHC6t1YLbUv2cdEMTEDwDon-MCh1krUU0d9yFhns3o';

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};

  let response = [];
  await axios
    .get(`${BaseURL_TWO}/developers/account/transactions/?type=deposit${params}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};
export const fetchStoreWalletOverview = async storeName => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1Nzg3NjU2LCJpYXQiOjE3NDU1NzE2NTYsImp0aSI6ImI5ZGZkMGM3MmRmMDRiYzFhNGQwZTViZWUyMGY0OWNhIiwidXNlcl9pZCI6MjA0NSwiZGV2aWNlX2lkIjpudWxsfQ.ljHC6t1YLbUv2cdEMTEDwDon-MCh1krUU0d9yFhns3o';

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/developers/account/store-wallet-overview?store=${storeName}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};
export const fetchAllStoreWalletUserTxns = async param => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1Nzg3NjU2LCJpYXQiOjE3NDU1NzE2NTYsImp0aSI6ImI5ZGZkMGM3MmRmMDRiYzFhNGQwZTViZWUyMGY0OWNhIiwidXNlcl9pZCI6MjA0NSwiZGV2aWNlX2lkIjpudWxsfQ.ljHC6t1YLbUv2cdEMTEDwDon-MCh1krUU0d9yFhns3o';

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/developers/account/store-wallet${param}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};
// 	const token = typeof window !== 'undefined' && localStorage.getItem('devToken') !== 'undefined' && JSON.parse(localStorage.getItem('devToken'));

// 	const BEARER_TOKEN = {
// 		headers: {Authorization: `Bearer ${token}`},
// 	};
// 	let response = [];
// 	await axios.get(`${BaseURL_TWO}/developers/account/store-wallet-transactions?store=${storeName}&target=users`, BEARER_TOKEN).then((res) => (response = res));
// 	return response;
// };
export const fetchAllStoreWalletAgentsTxns = async param => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1Nzg3NjU2LCJpYXQiOjE3NDU1NzE2NTYsImp0aSI6ImI5ZGZkMGM3MmRmMDRiYzFhNGQwZTViZWUyMGY0OWNhIiwidXNlcl9pZCI6MjA0NSwiZGV2aWNlX2lkIjpudWxsfQ.ljHC6t1YLbUv2cdEMTEDwDon-MCh1krUU0d9yFhns3o';

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/developers/agent-wallets${param}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const fetchExcrowPayments = async () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1Nzg3NjU2LCJpYXQiOjE3NDU1NzE2NTYsImp0aSI6ImI5ZGZkMGM3MmRmMDRiYzFhNGQwZTViZWUyMGY0OWNhIiwidXNlcl9pZCI6MjA0NSwiZGV2aWNlX2lkIjpudWxsfQ.ljHC6t1YLbUv2cdEMTEDwDon-MCh1krUU0d9yFhns3o';

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios.get(`${BaseURL_TWO}/developers/escrows`, BEARER_TOKEN).then(res => (response = res));
  return response;
};
export const fetchEscrowHistory = async () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1Nzg3NjU2LCJpYXQiOjE3NDU1NzE2NTYsImp0aSI6ImI5ZGZkMGM3MmRmMDRiYzFhNGQwZTViZWUyMGY0OWNhIiwidXNlcl9pZCI6MjA0NSwiZGV2aWNlX2lkIjpudWxsfQ.ljHC6t1YLbUv2cdEMTEDwDon-MCh1krUU0d9yFhns3o';

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/developers/escrows?history=true`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const fetchExcrowSummary = async () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1Nzg3NjU2LCJpYXQiOjE3NDU1NzE2NTYsImp0aSI6ImI5ZGZkMGM3MmRmMDRiYzFhNGQwZTViZWUyMGY0OWNhIiwidXNlcl9pZCI6MjA0NSwiZGV2aWNlX2lkIjpudWxsfQ.ljHC6t1YLbUv2cdEMTEDwDon-MCh1krUU0d9yFhns3o';

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/developers/account/escrows-summary`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const getEquityOverview = async () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1Nzg3NjU2LCJpYXQiOjE3NDU1NzE2NTYsImp0aSI6ImI5ZGZkMGM3MmRmMDRiYzFhNGQwZTViZWUyMGY0OWNhIiwidXNlcl9pZCI6MjA0NSwiZGV2aWNlX2lkIjpudWxsfQ.ljHC6t1YLbUv2cdEMTEDwDon-MCh1krUU0d9yFhns3o';

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/developers/account/equity/overview`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};
export const getUpcomingDeposits = async param => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1Nzg3NjU2LCJpYXQiOjE3NDU1NzE2NTYsImp0aSI6ImI5ZGZkMGM3MmRmMDRiYzFhNGQwZTViZWUyMGY0OWNhIiwidXNlcl9pZCI6MjA0NSwiZGV2aWNlX2lkIjpudWxsfQ.ljHC6t1YLbUv2cdEMTEDwDon-MCh1krUU0d9yFhns3o';

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/developers/account/upcomings/${param}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};
export const getAccountPaymentDetails = async id => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1Nzg3NjU2LCJpYXQiOjE3NDU1NzE2NTYsImp0aSI6ImI5ZGZkMGM3MmRmMDRiYzFhNGQwZTViZWUyMGY0OWNhIiwidXNlcl9pZCI6MjA0NSwiZGV2aWNlX2lkIjpudWxsfQ.ljHC6t1YLbUv2cdEMTEDwDon-MCh1krUU0d9yFhns3o';

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/investment/equity-upcomings/${parseInt(id)}/`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};
export const getAccountGraphDetails = async val => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1Nzg3NjU2LCJpYXQiOjE3NDU1NzE2NTYsImp0aSI6ImI5ZGZkMGM3MmRmMDRiYzFhNGQwZTViZWUyMGY0OWNhIiwidXNlcl9pZCI6MjA0NSwiZGV2aWNlX2lkIjpudWxsfQ.ljHC6t1YLbUv2cdEMTEDwDon-MCh1krUU0d9yFhns3o';

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(
      `${BaseURL_TWO}/developers/account/graph?${
        val == '4'
          ? `years=${5}`
          : val == '3'
            ? `months=${12}`
            : val == '2'
              ? `weeks=${4}`
              : val == '1'
                ? `days=${7}`
                : `months=${60}`
      }`,
      BEARER_TOKEN
    )
    .then(res => (response = res));
  return response;
};
export const getAccountPastPayments = async id => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1Nzg3NjU2LCJpYXQiOjE3NDU1NzE2NTYsImp0aSI6ImI5ZGZkMGM3MmRmMDRiYzFhNGQwZTViZWUyMGY0OWNhIiwidXNlcl9pZCI6MjA0NSwiZGV2aWNlX2lkIjpudWxsfQ.ljHC6t1YLbUv2cdEMTEDwDon-MCh1krUU0d9yFhns3o';

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .post(`${BaseURL_ONE}/transaction/equity/${parseInt(id)}/`, {}, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const getUserPaymentBreakdown = async (id, params) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1Nzg3NjU2LCJpYXQiOjE3NDU1NzE2NTYsImp0aSI6ImI5ZGZkMGM3MmRmMDRiYzFhNGQwZTViZWUyMGY0OWNhIiwidXNlcl9pZCI6MjA0NSwiZGV2aWNlX2lkIjpudWxsfQ.ljHC6t1YLbUv2cdEMTEDwDon-MCh1krUU0d9yFhns3o';

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/investment/equity-upcomings/${parseInt(id)}/${params}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const getCoownerIndividualBreakdown = async (equityId, userId) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1Nzg3NjU2LCJpYXQiOjE3NDU1NzE2NTYsImp0aSI6ImI5ZGZkMGM3MmRmMDRiYzFhNGQwZTViZWUyMGY0OWNhIiwidXNlcl9pZCI6MjA0NSwiZGV2aWNlX2lkIjpudWxsfQ.ljHC6t1YLbUv2cdEMTEDwDon-MCh1krUU0d9yFhns3o';

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/developers/coown-individual/${equityId}/?user=${userId}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};
export const getCoownerIndividualBreakdown2 = async (equityId, userId) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1Nzg3NjU2LCJpYXQiOjE3NDU1NzE2NTYsImp0aSI6ImI5ZGZkMGM3MmRmMDRiYzFhNGQwZTViZWUyMGY0OWNhIiwidXNlcl9pZCI6MjA0NSwiZGV2aWNlX2lkIjpudWxsfQ.ljHC6t1YLbUv2cdEMTEDwDon-MCh1krUU0d9yFhns3o';

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/investment/co-own-individual/{${equityId}}/?user=${userId}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const getAccountTransactionStatement = async params => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1Nzg3NjU2LCJpYXQiOjE3NDU1NzE2NTYsImp0aSI6ImI5ZGZkMGM3MmRmMDRiYzFhNGQwZTViZWUyMGY0OWNhIiwidXNlcl9pZCI6MjA0NSwiZGV2aWNlX2lkIjpudWxsfQ.ljHC6t1YLbUv2cdEMTEDwDon-MCh1krUU0d9yFhns3o';

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/developers/transaction_statement/${params}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};
export const fetchDeveloperVirtualAccount = async () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1Nzg3NjU2LCJpYXQiOjE3NDU1NzE2NTYsImp0aSI6ImI5ZGZkMGM3MmRmMDRiYzFhNGQwZTViZWUyMGY0OWNhIiwidXNlcl9pZCI6MjA0NSwiZGV2aWNlX2lkIjpudWxsfQ.ljHC6t1YLbUv2cdEMTEDwDon-MCh1krUU0d9yFhns3o';

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/account/get-user-virtual-account/`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};
export const fetchBillingHistory = async () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1Nzg3NjU2LCJpYXQiOjE3NDU1NzE2NTYsImp0aSI6ImI5ZGZkMGM3MmRmMDRiYzFhNGQwZTViZWUyMGY0OWNhIiwidXNlcl9pZCI6MjA0NSwiZGV2aWNlX2lkIjpudWxsfQ.ljHC6t1YLbUv2cdEMTEDwDon-MCh1krUU0d9yFhns3o';

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios.get(`${BaseURL_TWO}/developers/billings`, BEARER_TOKEN).then(res => (response = res));
  return response;
};
export const fetchCurrentBillingPlan = async () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1Nzg3NjU2LCJpYXQiOjE3NDU1NzE2NTYsImp0aSI6ImI5ZGZkMGM3MmRmMDRiYzFhNGQwZTViZWUyMGY0OWNhIiwidXNlcl9pZCI6MjA0NSwiZGV2aWNlX2lkIjpudWxsfQ.ljHC6t1YLbUv2cdEMTEDwDon-MCh1krUU0d9yFhns3o';

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/developers/billing-plan`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const getSelectedGateway = async () => {
  let response = [];

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1Nzg3NjU2LCJpYXQiOjE3NDU1NzE2NTYsImp0aSI6ImI5ZGZkMGM3MmRmMDRiYzFhNGQwZTViZWUyMGY0OWNhIiwidXNlcl9pZCI6MjA0NSwiZGV2aWNlX2lkIjpudWxsfQ.ljHC6t1YLbUv2cdEMTEDwDon-MCh1krUU0d9yFhns3o';

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  await axios.get(`${BaseURL_TWO}/payment/providers`, BEARER_TOKEN).then(res => (response = res));

  return response;
};

export const VerifyDeveloperAccountName = async (accountNumber, bankCode) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1Nzg3NjU2LCJpYXQiOjE3NDU1NzE2NTYsImp0aSI6ImI5ZGZkMGM3MmRmMDRiYzFhNGQwZTViZWUyMGY0OWNhIiwidXNlcl9pZCI6MjA0NSwiZGV2aWNlX2lkIjpudWxsfQ.ljHC6t1YLbUv2cdEMTEDwDon-MCh1krUU0d9yFhns3o';

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axios
    .get(
      `${BaseURL_TWO}/developers/setting-account?account=true&account_number=4832749375&bank_code=033/`,
      BEARER_TOKEN
    )
    .then(res => (response = res));
  return response;
};

// POST
export const initiateWithdrawal = body => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1Nzg3NjU2LCJpYXQiOjE3NDU1NzE2NTYsImp0aSI6ImI5ZGZkMGM3MmRmMDRiYzFhNGQwZTViZWUyMGY0OWNhIiwidXNlcl9pZCI6MjA0NSwiZGV2aWNlX2lkIjpudWxsfQ.ljHC6t1YLbUv2cdEMTEDwDon-MCh1krUU0d9yFhns3o';

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axios.post(`${BaseURL_TWO}/developers/withdrawal`, body, BEARER_TOKEN);
};
export const changeBillingPlan = body => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1Nzg3NjU2LCJpYXQiOjE3NDU1NzE2NTYsImp0aSI6ImI5ZGZkMGM3MmRmMDRiYzFhNGQwZTViZWUyMGY0OWNhIiwidXNlcl9pZCI6MjA0NSwiZGV2aWNlX2lkIjpudWxsfQ.ljHC6t1YLbUv2cdEMTEDwDon-MCh1krUU0d9yFhns3o';

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axios.post(
    `${BaseURL_TWO}/developers/billing-plan`,
    {...body, upgrade: true},
    BEARER_TOKEN
  );
};
export const AddPaymentGateway = body => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1Nzg3NjU2LCJpYXQiOjE3NDU1NzE2NTYsImp0aSI6ImI5ZGZkMGM3MmRmMDRiYzFhNGQwZTViZWUyMGY0OWNhIiwidXNlcl9pZCI6MjA0NSwiZGV2aWNlX2lkIjpudWxsfQ.ljHC6t1YLbUv2cdEMTEDwDon-MCh1krUU0d9yFhns3o';

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axios.post(`${BaseURL_TWO}/payment/providers`, {...body}, BEARER_TOKEN);
};

export const activityLog = ({id}) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1Nzg3NjU2LCJpYXQiOjE3NDU1NzE2NTYsImp0aSI6ImI5ZGZkMGM3MmRmMDRiYzFhNGQwZTViZWUyMGY0OWNhIiwidXNlcl9pZCI6MjA0NSwiZGV2aWNlX2lkIjpudWxsfQ.ljHC6t1YLbUv2cdEMTEDwDon-MCh1krUU0d9yFhns3o';

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axios.get(`${BaseURL_TWO}/developers/agent-activity/${id}/`, BEARER_TOKEN);
};
export const activityLogListings = ({id}) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1Nzg3NjU2LCJpYXQiOjE3NDU1NzE2NTYsImp0aSI6ImI5ZGZkMGM3MmRmMDRiYzFhNGQwZTViZWUyMGY0OWNhIiwidXNlcl9pZCI6MjA0NSwiZGV2aWNlX2lkIjpudWxsfQ.ljHC6t1YLbUv2cdEMTEDwDon-MCh1krUU0d9yFhns3o';

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axios.get(`${BaseURL_TWO}/developers/activity_log/${id}?type=listing`, BEARER_TOKEN);
};
