import React, { Component } from "react";
import axios from "axios";
const API_URL = "http://localhost:8080/api";
const getUserShipping = () => {
    return axios.get(API_URL);
  };
  const setUserShipping = (userShippingCity,
    userShippingCountry,
    userShippingDefault,
    userShippingName,
    userShippingState,
    userShippingStreet1,
    userShippingStreet2,
    userShippingZipcode) => {
    return axios.post(`${API_URL}/user-shipping`,{userShippingCity,
        userShippingCountry,
        userShippingDefault,
        userShippingName,
        userShippingState,
        userShippingStreet1,
        userShippingStreet2,
        userShippingZipcode,});
  };
const MyAccountService ={
    setUserShipping,
}

export default MyAccountService;
