
import axios from '.';

export function loginUser(email, password) {
  return axios.post('/auth/login-user', {
    email,
    password,
  });
}

export function loginCompany(email, password) {
  return axios.post('/auth/login-company', {
    email,
    password,
  });
}

export function registerUser(payload)  {
  return axios.post('/auth/register-user', {
    ...payload
  });
}

export function registerCompany(name, email, password) {
  return axios.post('/auth/register-company', {
    name,
    email,
    password,
  });
}

export function resetPassword(password, token) {
  return axios.post('/auth/reset-password', {
    password,
    token,
  });
}

export function verifyToken(token) {
  return axios.post('/auth/verify-token', {
    token,
  });
}
