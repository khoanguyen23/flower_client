import React, { Component } from "react";
import axios from "axios";
import AuthService from "./auth.service";
import http from "../http-common";


const deleteUserShipping= async  (shippingId)=>{
  try {
    await http.delete(`/user-shipping/${shippingId}`);
    // Dispatch an action to update the store (assuming you have defined the appropriate action)
    // For example:
    
  } catch (error) {
    console.error("Error deleting flower:", error);
  }
}
const getUserShipping = () => {
  return http.get("/user-shipping");
};
const getUserPayment = () => {
  return http.get("/user-payment");
};
const updateDefaultShipping = (shippingId) => {
  return http.put(`/user-shipping/default/${shippingId}`);
};

const updateDefaultPayment = (paymentId) => {
  return http.put(`/user-payment/default/${paymentId}`);
};

const setUserShipping = (
  userShippingCity,
  userShippingCountry,
  userShippingDefault,
  userShippingName,
  userShippingState,
  userShippingStreet1,
  userShippingStreet2,
  userShippingZipcode
) => {
  return http.post("/user-shipping", {
    userShippingCity,
    userShippingCountry,
    userShippingDefault,
    userShippingName,
    userShippingState,
    userShippingStreet1,
    userShippingStreet2,
    userShippingZipcode,
  });
};

const setUserPayment = (
  cardNumber,
  cardName,
  expiryMonth,
  expiryYear,
  cvc,
  cardType,
  defaultPayment
) => {
  return http.post("/user-payment", {
    cardNumber,
    cardName,
    expiryMonth,
    expiryYear,
    cvc,
    cardType,
    defaultPayment,
  });
};

const MyAccountService = {
  setUserShipping,
  getUserShipping,
  updateDefaultShipping,
  setUserPayment,
  getUserPayment,
  updateDefaultPayment,
  deleteUserShipping
};

export default MyAccountService;
