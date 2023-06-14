import React, { Component } from "react";
import axios from "axios";

import http from "../http-common";
const getUserOrder = () => {
  return http.get("/user-orders");
};

const setUserOrder = () => {
  return http.post("/user-orders", {});
};
const getOrderDetails = (orderId) => {
  return http.get(`/user-orders/${orderId}`);
};
const updateOrderDetails = (orderId, selectedStatus) => {
  return http.put(`/user-orders/${orderId}`, { orderStatus: selectedStatus }, {
    headers: {
      "Content-Type": "application/json" // Adjust the content type as needed
    }
  });
};
const updateOrderMethod = (orderId, selectedMethod) => {
  return http.put(`/user-orders/${orderId}`, {shippingMethod: selectedMethod }, {
    headers: {
      "Content-Type": "application/json" // Adjust the content type as needed
    }
  });
};

const OrderService = {
  setUserOrder,
  getUserOrder,
  getOrderDetails,
  updateOrderDetails,
  updateOrderMethod
};

export default OrderService;
