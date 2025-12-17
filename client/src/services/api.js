import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });


API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);

export const saveUserProfile = (data) => API.post('/user/profile', data);
export const getUserProfile = () => API.get('/user/profile');
export const deleteUserAccount = () => API.delete('/user/delete');
export default API;