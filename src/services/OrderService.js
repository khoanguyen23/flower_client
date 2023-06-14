import React, { Component } from "react";
import axios from "axios";

import http from "../http-common";
const getUserOrder = () => {
  return http.get("/user-orders");
};

const setUserOrder = () => {
  return http.post("/user-orders");
};
const getOrderDetails = (orderId) => {
  return http.get(`/user-orders/${orderId}`);
};

const OrderService = {
  setUserOrder,
  getUserOrder,
  getOrderDetails
};

export default OrderService;
