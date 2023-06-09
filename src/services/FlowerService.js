import React, { Component } from "react";
// import axios from "axios";
// const API_URL = "http://localhost:8080/api";
import http from "../http-common"
const getFlower = () => {
  return http.get("/flowers");
};
const setFlower = (
  formData
) => {
  return http.post("/flowers", {
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
