import React, { Component } from "react";
import axios from "axios";
import AuthService from "./auth.service";
import http from "../http-common"


const getUserShipping = () => {
  return http.get("/user-shipping");
};
const updateDefaultShipping = (shippingId) => {
  return http.put(`/user-shipping/default/${shippingId}`);
};

  const setUserShipping = (userShippingCity,
    userShippingCountry,
    userShippingDefault,
    userShippingName,
    userShippingState,
    userShippingStreet1,
    userShippingStreet2,
    userShippingZipcode) => {
      return http.post("/user-shipping", {
        userShippingCity,
        userShippingCountry,
        userShippingDefault,
        userShippingName,
        userShippingState,
        userShippingStreet1,
        userShippingStreet2,
        userShippingZipcode,});
  };

  const setUserPayment = (
     cardNumber,
     cardName,
     expiryMonth,
     expiryYear,
     cvc,
     cardType
  ) => {
    return http.post("/user-payment", {
      cardNumber,
     cardName,
     expiryMonth,
     expiryYear,
     cvc,
     cardType
    })
  }

const MyAccountService ={
    setUserShipping,
    getUserShipping,
    updateDefaultShipping,
    setUserPayment
}

export default MyAccountService;
