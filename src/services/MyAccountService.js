import React, { Component } from "react";
import axios from "axios";
import AuthService from "./auth.service";
import http from "../http-common";


const deleteUserShipping= (shippingId)=>{
  return http.delete(`/user-shipping/${shippingId}`);

}

const getCartItem = () => {
  return http.get("/cart-items/shopping-cart");
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
  deleteUserShipping,
  // deleteCartItem,
  getCartItem,
};

export default MyAccountService;
