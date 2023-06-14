import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";


const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};


const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const changePassword = (userId, currentPassword, newPassword, confirmPassword) => {
  return axios.put(API_URL + `users/${userId}/password`, {
    currentPassword,
    newPassword,
    confirmPassword,
  });
}

const updateUser = (userId, userName, email, telephone, firstName, lastName) => {
  return axios.put(API_URL + `users/${userId}`, {
    userName,
    email,
    telephone,
    firstName,
    lastName
  })
}

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  changePassword,
  updateUser,
};

export default AuthService;