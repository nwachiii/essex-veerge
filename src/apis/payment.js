import axios from "axios";

import { BaseURL_TWO, BaseURL_ONE } from "../constants/routes";

// const userToken =
//   typeof window !== "undefined" &&
//   localStorage &&
//   localStorage.getItem("userToken");

// const BEARER_USER_TOKEN = {
//   headers: { Authorization: `Bearer ${userToken}` },}

export const fetchInvestorPackets = async (id) => {
  const userToken =
    typeof window !== "undefined" &&
    localStorage.getItem("devToken") !== "undefined" &&
    JSON.parse(localStorage.getItem("devToken"));

  const BEARER_USER_TOKEN = {
    headers: { Authorization: `Bearer ${userToken}` },
  };

  let response = [];
  await axios
    .get(
      `${BaseURL_TWO}/investment/equity/${parseInt(
        id
      )}/packets/?requester=developer`
    )
    .then((res) => (response = res));
  return response;
};

//POST
export const sendInvestorPackets = (id, body) => {
  const userToken =
    typeof window !== "undefined" &&
    localStorage.getItem("devToken") !== "undefined" &&
    JSON.parse(localStorage.getItem("devToken"));

  const BEARER_USER_TOKEN = {
    headers: { Authorization: `Bearer ${userToken}` },
  };
  return axios.post(
    `${BaseURL_TWO}/developers/equity-packets/${parseInt(id)}/`,
    body,
    BEARER_USER_TOKEN
  );
  // This endpoint could be for initial payment plan.
};
