// import axios from 'utils/axiosInstance';

import {BaseURL_TWO, BaseURL_ONE} from '../constants/routes';
import axiosInstance from 'utils/axiosInstance';

// const token = typeof window !== 'undefined' && localStorage.getItem('devToken') !== 'undefined' && JSON.parse(localStorage.getItem('devToken'));
// const BEARER_TOKEN = {
// 	headers: {Authorization: `Bearer ${token}`},
// };

export const fetchAmenities = async () => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axiosInstance
    .get(`${BaseURL_ONE}/investment/amenity`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};
export const fetchListingDisplayImages = async listingID => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axiosInstance
    .get(`${BaseURL_TWO}/developers/listing-profile/${listingID}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const fetchUnitDisplayImages = async listingID => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {
    headers: {Authorization: `Bearer ${token}`},
  };
  let response = [];
  await axiosInstance
    .get(`${BaseURL_TWO}/developers/bundle-profile/${listingID}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const fetchListings = async params => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  // console.log(response);
  await axiosInstance
    .get(`${BaseURL_ONE}/investment/project${params}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};
export const getListings = async (query = '') => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];

  await axiosInstance
    .get(`${BaseURL_TWO}/developers/listings${query}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const fetchListingDetail = async id => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  // console.log(response);
  await axiosInstance
    .get(`${BaseURL_ONE}/investment/project/${id}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const fetchListingStats = async () => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  // console.log(response);
  await axiosInstance
    .get(`${BaseURL_ONE}/investment/data_stats`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const fetchAllListingBundles = async (projectId, query = '') => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  // console.log(response);
  await axiosInstance
    .get(
      `${BaseURL_TWO}/investment/project-bundles/?project_id=${Number(projectId)}${query}`,
      BEARER_TOKEN
    )
    .then(res => (response = res));
  return response;
};
export const fetchDrafts = async state => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  // console.log(response);
  await axiosInstance
    .get(`${BaseURL_ONE}/investment/project?is_draft=${true}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};
export const fetchCustomPayments = async id => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  // console.log(response);
  await axiosInstance
    .get(`${BaseURL_TWO}/investments/custom-plan-payments/${id}/`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};
export const fetchAllArchivedUnits = async projectId => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  // console.log(response);
  await axiosInstance
    .get(`${BaseURL_TWO}/developers/archive/${parseInt(projectId)}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};
export const fetchListingTxns = async projectId => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  console.log(projectId);
  await axiosInstance
    .get(`${BaseURL_ONE}/transaction/project/${projectId}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};
export const fetchListingInspection = async param => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];

  await axiosInstance
    .get(`${BaseURL_TWO}/developers/project-inspection/${param}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};
export const fetchUnitTxns = async (unitId, filter) => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axiosInstance
    .get(
      `${BaseURL_TWO}/developers/unit-equities/${parseInt(unitId)}/${
        filter == '4'
          ? '?defaulting=true'
          : filter == '3'
            ? '?completed=false'
            : filter == '2'
              ? '?completed=true'
              : ''
      }`,
      BEARER_TOKEN
    )
    .then(res => (response = res));
  return response;
};
export const fetchFractionalListingTxns = async projectId => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  // console.log(response);
  await axiosInstance
    .get(`${BaseURL_TWO}/developers/fractional-purchases/${projectId}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};
export const fetchPaymentPlanContract = async planId => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  // console.log(response);
  await axiosInstance
    .get(`${BaseURL_TWO}/developers/project-documents?plan=${planId}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};
export const fetchListingOutstandingBalanceCustomers = async (projectId, filter, sort) => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  // console.log(response);
  await axiosInstance
    .get(
      `${BaseURL_TWO}/developers/outstanding/${parseInt(projectId)}${
        filter == '4'
          ? '?defaulting=true'
          : filter == '3'
            ? '?outstanding=false'
            : filter == '2'
              ? '?outstanding=true'
              : ''
      }${sort}`,
      BEARER_TOKEN
    )
    .then(res => (response = res));
  return response;
};
export const fetchDocument = async (projectId, purpose) => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  // console.log(response);
  await axiosInstance
    .get(
      `${BaseURL_TWO}/developers/project-documents?project=${Number(projectId)}&purpose=${purpose}`,
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
  await axiosInstance
    .get(`${BaseURL_TWO}/investment/custom-plan-payments/${parseInt(planId)}/`, BEARER_TOKEN)
    .then(res => (response = res));

  return response;
};
export const fetchUnitsInListing = async listingId => {
  let response = [];
  await axiosInstance
    .get(`${BaseURL_TWO}/investment/project-bundles/?project_id=${Number(listingId)}`)
    .then(res => (response = res))
    .catch(res => (response = res));

  return response;
};

export const fetchAllBundlePaymentPlan = async bundleId => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  // console.log(response);
  await axiosInstance
    .get(
      `${BaseURL_TWO}/investment/bundle-paymentplans/?bundle_id=${parseInt(bundleId)}&is_admin=true
`,
      BEARER_TOKEN
    )
    .then(res => (response = res));
  return response;
};
export const fetchCustomPaymentPlans = async bundleId => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  // console.log(response);
  await axiosInstance
    .get(`${BaseURL_TWO}/investment/custom-plan-payments/${parseInt(bundleId)}/`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};
export const fetchFractionalizedInfo = async bundleId => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  // console.log(response);
  await axiosInstance
    .get(
      `${BaseURL_TWO}/developers/fractions/info/${parseInt(bundleId)}
`,
      BEARER_TOKEN
    )
    .then(res => (response = res));
  return response;
};

export const fetchFractionalGrouping = async unitId => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  // console.log(response);
  await axiosInstance
    .get(`${BaseURL_TWO}/developers/fractional-grouping/${unitId}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};
export const fetchFractionalDividendPaymentHistory = async unitId => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  // console.log(response);
  await axiosInstance
    .get(`${BaseURL_TWO}/developers/fractions/dividend/history/${unitId}/`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const getAllContactPersons = async projectId => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  await axiosInstance
    .get(`${BaseURL_TWO}/developers/contact-persons?project=${projectId}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};
// SHOULD BE A POST REQUEST
// export const fetchPayDividend = async unitId => {
//   const token =
//     typeof window !== 'undefined' &&
//     localStorage.getItem('devToken') !== 'undefined' &&
//     JSON.parse(localStorage.getItem('devToken'));

//   const BEARER_TOKEN = {
//     headers: {Authorization: `Bearer ${token}`},
//   };
//   let response = [];
//   // console.log(response);
//   await axiosInstance
//     .get(`${BaseURL_TWO}/developers/fractions/dividend/`, BEARER_TOKEN)
//     .then(res => (response = res));
//   return response;
// };

export const getPendingEquities = async (bundleId, planId = null, fee = false) => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const headers = {Authorization: `Bearer ${token}`};
  let url = `${BaseURL_TWO}/investment/pending-equities/${Number(bundleId)}/`;
  if (fee) {
    url += `?fee=${fee}`;
  }
  if (planId !== null) {
    url += `?planId=${planId}`;
  }
  const BEARER_TOKEN = {headers: headers};
  let response = [];
  await axiosInstance.get(url, BEARER_TOKEN).then(res => (response = res));
  return response;
};

// POST REQUESTS
export const addListingDocument = (projectId, body) => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axiosInstance.post(
    `${BaseURL_TWO}/developers/project-documents?project=${parseInt(projectId)}`,
    body,
    BEARER_TOKEN
  );
};
export const addAmenitiesToProject = (projectId, body) => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axiosInstance.post(
    `${BaseURL_TWO}/developers/add-project-amenities/${parseInt(projectId)}/`,
    body,
    BEARER_TOKEN
  );
};
export const addUnitsToArchive = (bundleId, body) => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axiosInstance.patch(
    `${BaseURL_TWO}/developers/archive/${parseInt(bundleId)}`,
    body,
    BEARER_TOKEN
  );
};

export const allocateUnit = ({id, body}) => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axiosInstance.put(
    `${BaseURL_TWO}/developers/allocations/${parseInt(id)}/`,
    body,
    BEARER_TOKEN
  );
};
export const publishProject = body => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axiosInstance.post(`${BaseURL_TWO}/developers/publish-project/`, body, BEARER_TOKEN);
};

export const initializeProject = body => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axiosInstance.post(`${BaseURL_TWO}/developers/create-project/`, body, BEARER_TOKEN);
};
export const initializeProjectWithBundle = body => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axiosInstance.post(`${BaseURL_TWO}/developers/create-project-bundle/`, body, BEARER_TOKEN);
};

export const CreateCustomerEquity = body => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axiosInstance.post(`${BaseURL_TWO}/developers/equity/`, body, BEARER_TOKEN);
};
export const EditProject = (id, body) => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axiosInstance.post(`${BaseURL_TWO}/developers/edit-project/${id}/`, body, BEARER_TOKEN);
};
export const EditProjectWithBundle = (id, body) => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axiosInstance.post(
    `${BaseURL_TWO}/developers/edit-project-bundle/${id}/`,
    body,
    BEARER_TOKEN
  );
};
export const EditProjectCommission = (id, body) => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axiosInstance.post(`${BaseURL_TWO}/developers/edit-project/${id}/`, body, BEARER_TOKEN);
};

export const EditContactPerson = (id, body) => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axiosInstance.post(`${BaseURL_TWO}/developers/edit-project/${id}/`, body, BEARER_TOKEN);
};
export const AddNewContactPerson = (id, body) => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axiosInstance.post(
    `${BaseURL_TWO}/developers/contact-persons?project=${id}`,
    body,
    BEARER_TOKEN
  );
};

export const RemoveContactPerson = (id, projectID) => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axiosInstance.delete(
    `${BaseURL_TWO}/developers/contact-persons/${id}?project=${projectID}`,
    BEARER_TOKEN
  );
};

export const EditBundlePaymentPlan = (id, body) => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axiosInstance.patch(`${BaseURL_TWO}/investment/edit-bundle/${id}/`, body, BEARER_TOKEN);
};
export const EditUnitInfo = (id, body) => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axiosInstance.patch(`${BaseURL_TWO}/investment/edit-bundle/${id}/`, body, BEARER_TOKEN);
};

export const EditUnitPrice = (id, body) => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axiosInstance.patch(
    `${BaseURL_TWO}/investment/edit-bundle-price/${id}/`,
    body,
    BEARER_TOKEN
  );
};

export const EditUnitQuantity = (id, body) => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axiosInstance.patch(
    `${BaseURL_TWO}/investment/edit-bundle-quantity/${id}/`,
    body,
    BEARER_TOKEN
  );
};
export const KeepPriceForEquities = (id, body) => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axiosInstance.post(
    `${BaseURL_TWO}/investment/pending-equities/${Number(id)}/`,
    body,
    BEARER_TOKEN
  );
};

export const uploadAllocationsDiagram = (id, body) => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axiosInstance.post(
    `${BaseURL_TWO}/developers/allocation-images?unit=${id}`,
    body,
    BEARER_TOKEN
  );
};

export const createAllocations = async (id, body) => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axiosInstance
    .post(`${BaseURL_TWO}/developers/allocations/`, body, BEARER_TOKEN)
    .then(() => {
      axiosInstance.post(
        `${BaseURL_TWO}/developers/allocation-images?unit=${id}`,
        body,
        BEARER_TOKEN
      );
    });
};
export const createNewPaymentPlan = async body => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axiosInstance.post(`${BaseURL_TWO}/investment/add-new-plan/`, body, BEARER_TOKEN);
};
export const addNewClosingCosts = async body => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axiosInstance.post(`${BaseURL_TWO}/investment/add-new-fees/`, body, BEARER_TOKEN);
};

export const archiveAllocations = body => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axiosInstance.post(
    `${BaseURL_TWO}/developers/allocations/archive-operation/`,
    body,
    BEARER_TOKEN
  );
};
export const respondToInspectionFeedBack = (inspection_id, body) => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axiosInstance.post(
    `${BaseURL_TWO}/developers/project-inspection/${inspection_id}/`,
    body,
    BEARER_TOKEN
  );
};

export const calculateTotalFractions = body => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axiosInstance.post(`${BaseURL_TWO}/developers/fractions`, body, BEARER_TOKEN);
};
export const updateListingDisplayPicture = (listingID, body) => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axiosInstance.post(
    `${BaseURL_TWO}/developers/listing-profile/${listingID}`,
    body,
    BEARER_TOKEN
  );
};

export const updateUnitDisplayPicture = (unitID, body) => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {
    headers: {Authorization: `Bearer ${token}`},
  };
  return axiosInstance.post(`${BaseURL_TWO}/developers/bundle-profile/${unitID}`, body, BEARER_TOKEN);
};

export const createFractions = body => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axiosInstance.post(`${BaseURL_TWO}/developers/fractions`, body, BEARER_TOKEN);
};

export const editFractionalQuantity = (bundleId, body) => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axiosInstance.post(
    `${BaseURL_TWO}/developers/fractions/edit/${bundleId}/quantity`,
    body,
    BEARER_TOKEN
  );
};

export const payFractionalDividend = body => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axiosInstance.post(`${BaseURL_TWO}/developers/fractions/dividend/`, body, BEARER_TOKEN);
};
export const sendBase64ForUrl = body => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axiosInstance.post(`${BaseURL_ONE}/investment/uploadbase64/`, body, BEARER_TOKEN);
};

export const pinListing = id => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};

  return axiosInstance.post(`${BaseURL_TWO}/developers/pin_listing/${id}`, {}, BEARER_TOKEN);
};

export const editFractions = body => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axiosInstance.patch(`${BaseURL_TWO}/developers/fractions/edit/`, body, BEARER_TOKEN);
};

// DELETE
export const deleteListingFromDraft = id => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axiosInstance.delete(`${BaseURL_ONE}/investment/project/${id}`, id, BEARER_TOKEN);
};

export const makeListingPrivate = async (bundleId, data) => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  return axiosInstance.patch(
    `${BaseURL_TWO}/developers/make_private/${parseInt(bundleId)}?project=true&status=${data}`,
    {},
    BEARER_TOKEN
  );
};

export const makeUnitPrivate = async (bundleId, data) => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {
    headers: {Authorization: `Bearer ${token}`},
  };
  return axiosInstance.patch(
    `${BaseURL_TWO}/developers/make_private/${parseInt(bundleId)}?bundle=true&status=${data}`,
    data,
    BEARER_TOKEN
  );
};

export const toggleScheduleInspectionAvailability = async (listingID, query) => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  //status=AcceptedorRejected
  return axiosInstance.patch(
    `${BaseURL_TWO}/developers/manage-listing/${parseInt(listingID)}${query}`,
    {},
    BEARER_TOKEN
  );
};

export const toggleFractionalProgressBar = async (listingID, status) => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  //status=AcceptedorRejected
  return axiosInstance.patch(
    `${BaseURL_TWO}/developers/manage-listing/${listingID}?fraction-progress-bar=${status}`, //status=Enabled or Disabled
    {},
    BEARER_TOKEN
  );
};

export const removeListingFromPinnedList = id => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};
  let response = [];
  // console.log(response);
  return axiosInstance.delete(`${BaseURL_TWO}/developers/pin_listing/${id}`, BEARER_TOKEN);
};

export const toggleMapView = (id, body) => {
  const token =
    typeof window !== 'undefined' &&
    localStorage.getItem('devToken') !== 'undefined' &&
    JSON.parse(localStorage.getItem('devToken'));

  const BEARER_TOKEN = {headers: {Authorization: `Bearer ${token}`}};

  return axiosInstance.patch(
    `${BaseURL_TWO}/developers/manage-listing/${id}?maps=${body}`,
    {},
    BEARER_TOKEN
  );
};

export const togglePinnedUnit = async (id, type) => {
  try {
    // Get token once and validate
    const token = getStoredToken();
    if (!token) {
      console.log('Authentication token not found');
    }

    // Common config object
    const config = {headers: {Authorization: `Bearer ${token}`}};

    // Use template literal for cleaner URL construction
    const url = `${BaseURL_TWO}/developers/pin-unit/${id}`;

    // Use object lookup instead of conditional
    const methods = {
      post: () => axiosInstance.post(url, null, config),
      delete: () => axiosInstance.delete(url, config),
    };

    const method = methods[type];
    if (!method) {
      console.log('Invalid request type');
    }

    return await method();
  } catch (error) {
    // Proper error handling
    console.error('Error toggling pinned unit:', error);
    throw error;
  }
};

// Helper function to get and validate token
const getStoredToken = () => {
  if (typeof window === 'undefined') return null;

  const storedToken = localStorage.getItem('devToken');
  try {
    return storedToken && storedToken !== 'undefined' ? JSON.parse(storedToken) : null;
  } catch {
    return null;
  }
};
