import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const login = (credentials) => {
  return axios.post(`${API_URL}/auth/signin`, credentials);
};

const register =  (username, email, password) => {
  return   axios.post(`${API_URL}/auth/signup`, {
    username,
    email,
    password,
  });
};

const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('user');
};

// const getUserInfo = async (accessToken) => {
//   return axios.get(`${API_URL}/users/me`, {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });
// };
const getUser = () => {
  const user = localStorage.getItem('user');
  if (user) {
    return JSON.parse(user);
  }
  return null;
}
const AuthService = {
  login,
  register,
  logout,
  getUser,
}
export default AuthService;
