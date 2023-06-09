import React, { Component } from "react";
// import axios from "axios";
// const API_URL = "http://localhost:8080/api";
import http from "../http-common"
const getFlower = () => {
  // return http.get("/flowers");
  return http.get("/flowers?_sort=id&_order=asc");
};
const setFlower = (
  formData
) => {
  return http.post("/flowers", {
    formData
  });
};

const deleteFlower = async (flowerId) => {
  try {
    await http.delete(`/flowers/${flowerId}`);
    // Dispatch an action to update the store (assuming you have defined the appropriate action)
    // For example:
    
  } catch (error) {
    console.error("Error deleting flower:", error);
  }
};
// const updateFlower = (flowerId, flowerData) => {
//   return http.put(`/flowers/${flowerId}`, flowerData);
// };


// const setFlower = (flowerData) => {
//   return axios.post(`${API_URL}/flowers`, flowerData);
// }
const FlowerService = {
  setFlower,
  getFlower,
  deleteFlower,
  // updateFlower,
};

export default FlowerService;
