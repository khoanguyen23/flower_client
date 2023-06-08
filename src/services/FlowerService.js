import React, { Component } from "react";
import axios from "axios";
const API_URL = "http://localhost:8080/api";
const getFlower = () => {
  return axios.get(`${API_URL}/flowers`);
};
const setFlower = (
  formData
) => {
  return axios.post(`${API_URL}/flowers`, {
    formData
  });
};

// const setFlower = (flowerData) => {
//   return axios.post(`${API_URL}/flowers`, flowerData);
// }
const FlowerService = {
  setFlower,
  getFlower,
};

export default FlowerService;
