
import { loginUser as loginUserAction, loginCompany as loginCompanyAction, logoutUser } from '../reducers/auth';
import { loginUser as loginUserApi, loginCompany as loginCompanyApi } from '../api/auth';

export function logout() {
  return (dispatch) => {
    dispatch(logoutUser());
    localStorage.removeItem('_token');
  };
}

export function loginUser(email, password) {
  return dispatch => loginUserApi(email, password)
    .then((response) => {
      const { data } = response.data;
      const { token, company } = data;
      delete data.token;
      delete data.company;
      return {
        token,
        user: data,
        company,
      };
    })
    .then((payload) => {
      dispatch(loginUserAction(payload));
      localStorage.setItem('_token', payload.token);
    });
}

export function loginCompany(email, password) {
  return dispatch => loginCompanyApi(email, password)
    .then((response) => {
      const { data } = response.data;
      const { token } = data;
      delete data.token;
      return {
        token,
        company: data,
      };
    })
    .then((payload) => {
      dispatch(loginCompanyAction(payload));
      localStorage.setItem('_token', payload.token);
    });
}
